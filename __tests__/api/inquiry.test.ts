import { afterEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import { POST } from "@/app/api/inquiry/route";

afterEach(() => vi.unstubAllGlobals());

describe("POST /api/inquiry", () => {
  it("sets an eight-second upstream deadline and preserves the success redirect", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);
    const body = new FormData();
    body.set("email", "buyer@example.com");
    body.set("success_path", "/inquiry/success");

    const response = await POST(new NextRequest("https://sf6inswitchgear.com/api/inquiry", {
      method: "POST",
      body,
    }));

    expect(response.status).toBe(303);
    expect(response.headers.get("location")).toContain("status=success");
    const options = fetchMock.mock.calls[0][1];
    expect(options.signal).toBeInstanceOf(AbortSignal);
    expect(options.signal.aborted).toBe(false);
  });

  it("returns an error redirect when the upstream request times out", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new DOMException("Timed out", "TimeoutError")));
    const body = new FormData();
    body.set("failure_path", "/contact");

    const response = await POST(new NextRequest("https://sf6inswitchgear.com/api/inquiry", {
      method: "POST",
      body,
    }));

    expect(response.status).toBe(303);
    expect(response.headers.get("location")).toBe("https://sf6inswitchgear.com/contact?status=error");
  });
});
