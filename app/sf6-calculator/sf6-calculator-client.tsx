"use client";

import { useMemo, useState } from "react";
import { Calculator, Droplets, Gauge, Ruler, ShieldAlert, Timer } from "lucide-react";

type CalculatorMode = "recovery" | "density" | "humidity" | "leak" | "units";

const SF6_MOLAR_MASS_KG_PER_MOL = 0.146055;
const GAS_CONSTANT = 8.314462618;
const STANDARD_TEMPERATURE_K = 293.15;

const modes: { id: CalculatorMode; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "recovery", label: "Recovery", icon: Timer },
  { id: "density", label: "Density", icon: Gauge },
  { id: "humidity", label: "Humidity", icon: Droplets },
  { id: "leak", label: "Leak Rate", icon: ShieldAlert },
  { id: "units", label: "Units", icon: Ruler },
];

function toNumber(value: string, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function clampPositive(value: number, fallback = 0) {
  return Number.isFinite(value) && value > 0 ? value : fallback;
}

function format(value: number, digits = 2) {
  if (!Number.isFinite(value)) return "-";
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: digits,
    minimumFractionDigits: value >= 10 ? 0 : Math.min(digits, 2),
  }).format(value);
}

function sf6DensityKgM3(pressureBarAbs: number, temperatureC: number) {
  const pressurePa = pressureBarAbs * 100000;
  const temperatureK = temperatureC + 273.15;
  return (pressurePa * SF6_MOLAR_MASS_KG_PER_MOL) / (GAS_CONSTANT * temperatureK);
}

function sf6MassKg(volumeLiters: number, pressureBarAbs: number, temperatureC: number) {
  return sf6DensityKgM3(pressureBarAbs, temperatureC) * (volumeLiters / 1000);
}

function saturationVaporPressureHpa(temperatureC: number) {
  const overIce = temperatureC < 0;
  const a = overIce ? 22.587 : 17.625;
  const b = overIce ? 273.86 : 243.04;
  return 6.1094 * Math.exp((a * temperatureC) / (b + temperatureC));
}

function dewPointFromVaporPressureHpa(vaporPressureHpa: number) {
  if (vaporPressureHpa <= 0) return Number.NaN;
  const ratio = Math.log(vaporPressureHpa / 6.1094);
  return (243.04 * ratio) / (17.625 - ratio);
}

function ppmvFromDewPoint(dewPointC: number, pressureBarAbs: number) {
  const vaporPressureHpa = saturationVaporPressureHpa(dewPointC);
  const pressureHpa = pressureBarAbs * 1000;
  return (vaporPressureHpa / Math.max(pressureHpa - vaporPressureHpa, 1)) * 1000000;
}

function dewPointFromPpmv(ppmv: number, pressureBarAbs: number) {
  const pressureHpa = pressureBarAbs * 1000;
  const vaporPressureHpa = (pressureHpa * ppmv) / (1000000 + ppmv);
  return dewPointFromVaporPressureHpa(vaporPressureHpa);
}

function Field({
  label,
  value,
  onChange,
  suffix,
  step = "any",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  suffix?: string;
  step?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-700">{label}</span>
      <div className="flex overflow-hidden rounded-md border border-slate-300 bg-white focus-within:border-blue-700 focus-within:ring-2 focus-within:ring-blue-100">
        <input
          type="number"
          step={step}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="min-h-11 w-full min-w-0 px-3 text-sm outline-none"
        />
        {suffix ? (
          <span className="flex min-h-11 items-center border-l bg-slate-50 px-3 text-sm text-slate-500">
            {suffix}
          </span>
        ) : null}
      </div>
    </label>
  );
}

function ResultCard({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <div className="rounded-md border border-slate-200 bg-white p-4">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-slate-950">{value}</p>
      {note ? <p className="mt-2 text-xs leading-5 text-slate-500">{note}</p> : null}
    </div>
  );
}

function RecoveryCalculator() {
  const [volume, setVolume] = useState("1200");
  const [pressure, setPressure] = useState("6");
  const [temperature, setTemperature] = useState("20");
  const [vacuum, setVacuum] = useState("5");
  const [flow, setFlow] = useState("35");

  const result = useMemo(() => {
    const volumeLiters = clampPositive(toNumber(volume), 1);
    const pressureBar = clampPositive(toNumber(pressure), 1);
    const temperatureC = toNumber(temperature, 20);
    const vacuumMbar = clampPositive(toNumber(vacuum), 1);
    const flowM3h = clampPositive(toNumber(flow), 1);
    const initialMass = sf6MassKg(volumeLiters, pressureBar, temperatureC);
    const residualMass = sf6MassKg(volumeLiters, vacuumMbar / 1000, temperatureC);
    const recoveryRatio = Math.max(initialMass - residualMass, 0) / Math.max(initialMass, 1);
    const timeHours = (volumeLiters / 1000 / flowM3h) * Math.log((pressureBar * 1000) / vacuumMbar);

    return {
      initialMass,
      residualMass,
      recoveredMass: Math.max(initialMass - residualMass, 0),
      recoveryRatio,
      timeHours,
    };
  }, [flow, pressure, temperature, vacuum, volume]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Gas compartment volume" value={volume} onChange={setVolume} suffix="L" />
        <Field label="Initial pressure" value={pressure} onChange={setPressure} suffix="bar abs" />
        <Field label="Gas temperature" value={temperature} onChange={setTemperature} suffix="C" />
        <Field label="Final recovery vacuum" value={vacuum} onChange={setVacuum} suffix="mbar abs" />
        <Field label="Nominal recovery flow" value={flow} onChange={setFlow} suffix="m3/h" />
      </div>
      <div className="grid gap-4">
        <ResultCard label="Estimated recovery time" value={`${format(result.timeHours * 60, 1)} min`} note="Guide value based on an idealized flow model." />
        <ResultCard label="Recoverable SF6 mass" value={`${format(result.recoveredMass, 2)} kg`} />
        <ResultCard label="Residual SF6 at final vacuum" value={`${format(result.residualMass * 1000, 2)} g`} />
        <ResultCard label="Recovery ratio" value={`${format(result.recoveryRatio * 100, 2)}%`} />
      </div>
    </div>
  );
}

function DensityCalculator() {
  const [pressure, setPressure] = useState("6");
  const [temperature, setTemperature] = useState("20");
  const [volume, setVolume] = useState("1000");

  const result = useMemo(() => {
    const density = sf6DensityKgM3(clampPositive(toNumber(pressure), 1), toNumber(temperature, 20));
    const mass = density * (clampPositive(toNumber(volume), 1) / 1000);
    return { density, mass };
  }, [pressure, temperature, volume]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Absolute pressure" value={pressure} onChange={setPressure} suffix="bar abs" />
        <Field label="Temperature" value={temperature} onChange={setTemperature} suffix="C" />
        <Field label="Compartment volume" value={volume} onChange={setVolume} suffix="L" />
      </div>
      <div className="grid gap-4">
        <ResultCard label="SF6 density" value={`${format(result.density, 3)} kg/m3`} />
        <ResultCard label="Estimated SF6 mass" value={`${format(result.mass, 2)} kg`} />
      </div>
    </div>
  );
}

function HumidityCalculator() {
  const [pressure, setPressure] = useState("6");
  const [dewPoint, setDewPoint] = useState("-40");
  const [ppmv, setPpmv] = useState("100");

  const result = useMemo(() => {
    const pressureBar = clampPositive(toNumber(pressure), 1);
    const dew = toNumber(dewPoint, -40);
    const concentration = clampPositive(toNumber(ppmv), 1);
    const calculatedPpmv = ppmvFromDewPoint(dew, pressureBar);
    return {
      ppmvFromDew: calculatedPpmv,
      ppmwFromDew: calculatedPpmv / 8.1,
      dewFromPpmv: dewPointFromPpmv(concentration, pressureBar),
      ppmw: concentration / 8.1,
    };
  }, [dewPoint, ppmv, pressure]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Absolute pressure" value={pressure} onChange={setPressure} suffix="bar abs" />
        <Field label="Dew point / frost point" value={dewPoint} onChange={setDewPoint} suffix="C" />
        <Field label="Moisture concentration" value={ppmv} onChange={setPpmv} suffix="ppmv" />
      </div>
      <div className="grid gap-4">
        <ResultCard label="Dew point to ppmv" value={`${format(result.ppmvFromDew, 1)} ppmv`} />
        <ResultCard label="Dew point to ppmw" value={`${format(result.ppmwFromDew, 1)} ppmw`} note="Uses SF6 relation ppmv = ppmw x 8.1." />
        <ResultCard label="ppmv to dew point" value={`${format(result.dewFromPpmv, 1)} C`} />
        <ResultCard label="ppmv to ppmw" value={`${format(result.ppmw, 1)} ppmw`} />
      </div>
    </div>
  );
}

function LeakCalculator() {
  const [initial, setInitial] = useState("0");
  const [final, setFinal] = useState("25");
  const [coverVolume, setCoverVolume] = useState("1.5");
  const [objectVolume, setObjectVolume] = useState("0.2");
  const [duration, setDuration] = useState("2");
  const [temperature, setTemperature] = useState("20");

  const result = useMemo(() => {
    const deltaPpm = Math.max(toNumber(final) - toNumber(initial), 0);
    const freeVolumeM3 = Math.max(toNumber(coverVolume) - toNumber(objectVolume), 0.001);
    const hours = clampPositive(toNumber(duration), 1);
    const leakM3h = (deltaPpm / 1000000) * freeVolumeM3 / hours;
    const density = sf6DensityKgM3(1.01325, toNumber(temperature, 20));
    const massGh = leakM3h * density * 1000;

    return {
      deltaPpm,
      leakMlH: leakM3h * 1000000,
      massGh,
      massGYear: massGh * 24 * 365,
    };
  }, [coverVolume, duration, final, initial, objectVolume, temperature]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Initial SF6 concentration" value={initial} onChange={setInitial} suffix="ppm" />
        <Field label="Final SF6 concentration" value={final} onChange={setFinal} suffix="ppm" />
        <Field label="Covering volume" value={coverVolume} onChange={setCoverVolume} suffix="m3" />
        <Field label="Test object volume" value={objectVolume} onChange={setObjectVolume} suffix="m3" />
        <Field label="Measurement duration" value={duration} onChange={setDuration} suffix="h" />
        <Field label="Ambient temperature" value={temperature} onChange={setTemperature} suffix="C" />
      </div>
      <div className="grid gap-4">
        <ResultCard label="Concentration increase" value={`${format(result.deltaPpm, 1)} ppm`} />
        <ResultCard label="Volumetric leak rate" value={`${format(result.leakMlH, 2)} mL/h`} />
        <ResultCard label="SF6 mass flow" value={`${format(result.massGh, 4)} g/h`} />
        <ResultCard label="Annualized mass loss" value={`${format(result.massGYear, 1)} g/year`} />
      </div>
    </div>
  );
}

function UnitConverter() {
  const [pressureBar, setPressureBar] = useState("1");
  const [temperatureC, setTemperatureC] = useState("20");
  const [volumeL, setVolumeL] = useState("1000");

  const result = useMemo(() => {
    const bar = toNumber(pressureBar, 1);
    const tempC = toNumber(temperatureC, 20);
    const liters = toNumber(volumeL, 1000);
    return {
      kpa: bar * 100,
      psi: bar * 14.5038,
      mbar: bar * 1000,
      f: tempC * 1.8 + 32,
      k: tempC + 273.15,
      m3: liters / 1000,
      ft3: liters * 0.0353147,
      gallons: liters * 0.264172,
    };
  }, [pressureBar, temperatureC, volumeL]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Pressure" value={pressureBar} onChange={setPressureBar} suffix="bar" />
        <Field label="Temperature" value={temperatureC} onChange={setTemperatureC} suffix="C" />
        <Field label="Volume" value={volumeL} onChange={setVolumeL} suffix="L" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <ResultCard label="Pressure" value={`${format(result.kpa, 2)} kPa`} note={`${format(result.psi, 2)} psi, ${format(result.mbar, 1)} mbar`} />
        <ResultCard label="Temperature" value={`${format(result.f, 1)} F`} note={`${format(result.k, 2)} K`} />
        <ResultCard label="Volume" value={`${format(result.m3, 3)} m3`} note={`${format(result.ft3, 2)} ft3, ${format(result.gallons, 2)} US gal`} />
      </div>
    </div>
  );
}

export function Sf6CalculatorClient() {
  const [mode, setMode] = useState<CalculatorMode>("recovery");

  return (
    <section className="bg-slate-50 py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap gap-2">
          {modes.map((item) => {
            const Icon = item.icon;
            const active = mode === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setMode(item.id)}
                className={`inline-flex min-h-11 items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium transition ${
                  active
                    ? "border-blue-800 bg-blue-800 text-white"
                    : "border-slate-200 bg-white text-slate-700 hover:border-blue-200 hover:bg-blue-50"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </button>
            );
          })}
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-6 flex items-start gap-3 border-b border-slate-200 pb-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-blue-800 text-white">
              <Calculator className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-slate-950">SF6 engineering calculator</h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                Use these guide calculations for SF6 recovery planning, mass estimation, humidity conversion,
                leak testing, and common unit conversions.
              </p>
            </div>
          </div>

          {mode === "recovery" ? <RecoveryCalculator /> : null}
          {mode === "density" ? <DensityCalculator /> : null}
          {mode === "humidity" ? <HumidityCalculator /> : null}
          {mode === "leak" ? <LeakCalculator /> : null}
          {mode === "units" ? <UnitConverter /> : null}
        </div>

        <div className="mt-6 rounded-md border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
          The results are engineering guide values only. Real recovery time depends on service cart capacity,
          hose type and length, gas temperature, filter condition, compartment geometry, and site operating
          conditions. Please confirm final specifications before maintenance or quotation decisions.
        </div>
      </div>
    </section>
  );
}
