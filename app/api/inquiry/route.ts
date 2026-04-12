import { NextRequest, NextResponse } from "next/server";

const INQUIRY_ENDPOINT = "https://inquiry.sf6sf6.com/updata_ppc.php";

function firstValue(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value : "";
}

function sanitizePath(path: string, fallback: string) {
  if (!path || !path.startsWith("/")) {
    return fallback;
  }

  return path;
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();

  const successPath = sanitizePath(
    firstValue(formData.get("success_path")),
    "/inquiry/success"
  );
  const failurePath = sanitizePath(
    firstValue(formData.get("failure_path")),
    successPath
  );
  const productName = firstValue(formData.get("product_name"));
  const productSlug = firstValue(formData.get("product_slug"));

  formData.delete("success_path");
  formData.delete("failure_path");

  const payload = new URLSearchParams();

  for (const [key, value] of formData.entries()) {
    if (typeof value === "string") {
      payload.append(key, value);
    }
  }

  try {
    const response = await fetch(INQUIRY_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: payload.toString(),
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Inquiry request failed with status ${response.status}`);
    }

    const redirectUrl = new URL(successPath, request.url);
    redirectUrl.searchParams.set("status", "success");

    if (productName) {
      redirectUrl.searchParams.set("product", productName);
    }
    if (productSlug) {
      redirectUrl.searchParams.set("product_slug", productSlug);
    }

    return NextResponse.redirect(redirectUrl, { status: 303 });
  } catch (error) {
    console.error("Inquiry submission failed:", error);

    const redirectUrl = new URL(failurePath, request.url);
    redirectUrl.searchParams.set("status", "error");

    if (productName) {
      redirectUrl.searchParams.set("product", productName);
    }
    if (productSlug) {
      redirectUrl.searchParams.set("product_slug", productSlug);
    }

    return NextResponse.redirect(redirectUrl, { status: 303 });
  }
}
