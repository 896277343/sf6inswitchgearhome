import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { locales, localizePath } from "@/lib/i18n/config";

export const maxDuration = 30;

/**
 * WordPress webhook handler for content revalidation
 * Receives notifications from WordPress when content changes
 * and revalidates the entire site
 */

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();
    const secret = request.headers.get("x-webhook-secret");

    if (secret !== process.env.WORDPRESS_WEBHOOK_SECRET) {
      console.error("Invalid webhook secret");
      return NextResponse.json(
        { message: "Invalid webhook secret" },
        { status: 401 }
      );
    }

    // Support both next-wp webhook payloads used by existing WordPress plugins.
    const legacyData = requestBody.data && typeof requestBody.data === "object" ? requestBody.data : {};
    const legacyType = requestBody.type === "term"
      ? legacyData.taxonomy === "post_tag" ? "tag" : "category"
      : requestBody.type;
    const contentType = requestBody.contentType || legacyType;
    const contentId = requestBody.contentId || legacyData.id;
    const contentSlug = requestBody.contentSlug || legacyData.slug;
    const contentPath = requestBody.contentPath;

    if (!contentType) {
      return NextResponse.json(
        { message: "Missing content type" },
        { status: 400 }
      );
    }

    try {
      console.log(
        `Revalidating content: ${contentType}${
          contentId ? ` (ID: ${contentId})` : ""
        }`
      );

      // Revalidate specific content type tags
      if (contentType !== "translation") revalidateTag("wordpress", { expire: 0 });

      if (contentType === "post") {
        revalidateTag("posts", { expire: 0 });
        if (!contentId && !contentSlug) revalidateTag("translated-posts", { expire: 0 });
        if (contentId) {
          revalidateTag(`post-${contentId}`, { expire: 0 });
          revalidateTag(`translated-post-id-${contentId}`, { expire: 0 });
        }
        if (contentSlug) {
          revalidateTag(`post-slug-${contentSlug}`, { expire: 0 });
          revalidateTag(`translated-post-slug-${contentSlug}`, { expire: 0 });
          for (const locale of locales) revalidatePath(localizePath(`/posts/${contentSlug}`, locale));
        }
        // Clear all post pages when any post changes
        revalidateTag("posts-page-1", { expire: 0 });
        for (const locale of locales) revalidatePath(localizePath("/posts", locale));
      } else if (contentType === "translation") {
        // Manual invalidation after an editor changes a stored translation.
        if (contentId) revalidateTag(`translated-post-id-${contentId}`, { expire: 0 });
        if (contentSlug) revalidateTag(`translated-post-slug-${contentSlug}`, { expire: 0 });
        if (!contentId && !contentSlug) revalidateTag("translated-posts", { expire: 0 });
        for (const locale of locales) revalidateTag(`transposh-${locale}`, { expire: 0 });
        if (contentSlug) {
          for (const locale of locales) revalidatePath(localizePath(`/posts/${contentSlug}`, locale));
        }
      } else if (contentType === "category") {
        revalidateTag("categories", { expire: 0 });
        if (contentId) {
          revalidateTag(`posts-category-${contentId}`, { expire: 0 });
          revalidateTag(`category-${contentId}`, { expire: 0 });
        }
      } else if (contentType === "tag") {
        revalidateTag("tags", { expire: 0 });
        if (contentId) {
          revalidateTag(`posts-tag-${contentId}`, { expire: 0 });
          revalidateTag(`tag-${contentId}`, { expire: 0 });
        }
      } else if (contentType === "author" || contentType === "user") {
        revalidateTag("authors", { expire: 0 });
        if (contentId) {
          revalidateTag(`posts-author-${contentId}`, { expire: 0 });
          revalidateTag(`author-${contentId}`, { expire: 0 });
        }
      }

      if (contentPath) {
        revalidatePath(contentPath);
      }

      // Also revalidate the entire layout for safety
      revalidatePath("/", "layout");

      return NextResponse.json({
        revalidated: true,
        message: `Revalidated ${contentType}${
          contentId ? ` (ID: ${contentId})` : ""
        } and related content`,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Error revalidating path:", error);
      return NextResponse.json(
        {
          revalidated: false,
          message: "Failed to revalidate site",
          error: (error as Error).message,
          timestamp: new Date().toISOString(),
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Revalidation error:", error);
    return NextResponse.json(
      {
        message: "Error revalidating content",
        error: (error as Error).message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
