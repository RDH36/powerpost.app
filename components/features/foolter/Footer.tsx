import { Typography } from "@/components/ui/Typography";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-card">
      <div className="mt-24 py-24">
        <div className="flex justify-between max-lg:flex-col">
          <div className="flex flex-col gap-4">
            <div className="space-y-1">
              <Typography variant="h3">PowerPost</Typography>
              <Typography variant="base">Codelynx, LLC</Typography>
            </div>
            <Typography variant="muted" className="italic">
              © {new Date().getFullYear()} Codelynx LLC - All rights reserved.
            </Typography>
          </div>
          <div className="flex flex-col items-end gap-4">
            <Typography variant="large">Legal</Typography>
            <Typography
              as={Link}
              variant="muted"
              className="hover:underline"
              href="/legal/terms"
            >
              Terms
            </Typography>
            <Typography
              as={Link}
              variant="muted"
              className="hover:underline"
              href="/legal/privacy"
            >
              Privacy
            </Typography>
          </div>
        </div>
      </div>
    </footer>
  );
};
