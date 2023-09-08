import { Icons } from "@/components/ui/icons";

export function Loading() {
  return (
    <>
      <div className="hidden flex-col items-center md:flex w-full">
        <div className="flex-1 space-y-4 items-center justify-between">
          <Icons.pagespinner className="container  h-[400px] animate-spin text-primary" />
        </div>
      </div>
    </>
  );
}