import { revalidatePath } from "next/cache";

/** Bust public page caches after admin CMS changes */
export function revalidatePublicContent() {
  revalidatePath("/", "layout");
  revalidatePath("/");
  revalidatePath("/testimonials");
  revalidatePath("/portfolio");
}
