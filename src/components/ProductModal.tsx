import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Bookmark, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { cn } from "@/lib/utils";

export interface ProductSpecs {
  shape: string;
  cut: string;
  color: string;
  clarity: string;
  carat: string;
  fluorescence: string;
  polish: string;
  symmetry: string;
  certification: string;
  origin: string;
}

export interface Product {
  title: string;
  ref: string;
  image: string;
  price: string;
  specs: ProductSpecs;
}

interface ProductModalProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * Full‑screen product modal.  A luxury black / gold theme with a fade+scale
 * animation.  It is controlled by the parent component via the `open`
 * prop, and not rendered if `product` is null.
 */
export default function ProductModal({ product, open, onOpenChange }: ProductModalProps) {
  if (!product) return null;
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = React.useState(false);
  const [isReserveOpen, setIsReserveOpen] = React.useState(false);
  const [isEnquireLoading, setIsEnquireLoading] = React.useState(false);
  const [isReserveLoading, setIsReserveLoading] = React.useState(false);

  const specItems = [
    { label: "Shape", value: product.specs.shape },
    { label: "Cut", value: product.specs.cut },
    { label: "Color", value: product.specs.color },
    { label: "Clarity", value: product.specs.clarity },
    { label: "Carat", value: product.specs.carat },
    { label: "Fluorescence", value: product.specs.fluorescence },
    { label: "Polish", value: product.specs.polish },
    { label: "Symmetry", value: product.specs.symmetry },
    { label: "Certification", value: product.specs.certification },
    { label: "Origin", value: product.specs.origin },
  ];

  React.useEffect(() => {
    try {
      const savedMap = JSON.parse(localStorage.getItem("savedProducts") || "{}") as Record<string, boolean>;
      setIsSaved(Boolean(savedMap[product.ref]));
    } catch {
      setIsSaved(false);
    }
  }, [product.ref]);

  React.useEffect(() => {
    if (!isReserveOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsReserveOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isReserveOpen]);

  const handleSave = async () => {
    const nextSaved = !isSaved;
    setIsSaved(nextSaved);
    try {
      const savedMap = JSON.parse(localStorage.getItem("savedProducts") || "{}") as Record<string, boolean>;
      savedMap[product.ref] = nextSaved;
      localStorage.setItem("savedProducts", JSON.stringify(savedMap));
    } catch {
      // ignore storage write failures and keep in-memory state
    }
    console.log(nextSaved ? "Saved" : "Unsaved", product);
  };

  const handleEnquire = async () => {
    setIsEnquireLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 400));
    const query = new URLSearchParams({ subject: `Enquiry about ${product.title}`, ref: product.ref }).toString();
    navigate(`/contact?${query}`);
    setIsEnquireLoading(false);
  };

  const handleReserve = async () => {
    setIsReserveLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 400));
    setIsReserveOpen(true);
    setIsReserveLoading(false);
    console.log("Reserved", product);
  };

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className={cn(
            "fixed inset-0 z-50 bg-black/80",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          )}
        />

        <DialogPrimitive.Content
          className={cn(
            "fixed inset-0 z-50 flex flex-col md:flex-row overflow-hidden",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          )}
          style={{ backgroundColor: "#070707", color: "#F5F5F5" }}
        >
          <div className="relative flex h-[44vh] items-center justify-center overflow-hidden bg-black p-6 md:h-auto md:w-1/2 md:p-10">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-black/60" />
            <img
              src={product.image}
              alt={product.title}
              className="relative z-10 h-full w-full object-contain md:max-h-[90vh]"
            />
          </div>

          <div className="flex flex-1 flex-col justify-between bg-gradient-to-b from-[#0E0E0E] via-[#090909] to-[#060606] p-6 sm:p-8 md:w-1/2 md:p-12">
            <div className="space-y-8">
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.34em] text-[#D4AF37]">Fine Jewelry</p>
                <h2
                  className="text-4xl font-medium leading-tight md:text-5xl"
                  style={{ fontFamily: "\"Didot\", \"Bodoni MT\", \"Times New Roman\", serif" }}
                >
                  {product.title}
                </h2>
                <p className="text-sm tracking-[0.14em] text-[#C9C9C9]">REF: {product.ref}</p>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                {specItems.map((item) => (
                  <div key={item.label} className="rounded-sm border border-[#2A2A2A] bg-[#0D0D0D] px-4 py-3">
                    <p className="text-[11px] uppercase tracking-[0.22em] text-[#D4AF37]">{item.label}</p>
                    <p className="mt-2 text-sm font-light text-[#F5F5F5]">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={handleReserve}
                disabled={isReserveLoading || isEnquireLoading}
                aria-label={`Reserve ${product.title}`}
                className="h-12 min-w-[180px] rounded-sm bg-[#D4AF37] px-7 text-sm font-medium uppercase tracking-[0.16em] text-black transition hover:brightness-110 active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isReserveLoading ? "Reserving..." : "Reserve Now"}
              </button>
              <button
                type="button"
                onClick={handleEnquire}
                disabled={isEnquireLoading || isReserveLoading}
                aria-label={`Enquire about ${product.title}`}
                className="h-12 min-w-[160px] rounded-sm border border-[#D4AF37] bg-transparent px-7 text-sm font-medium uppercase tracking-[0.16em] text-[#D4AF37] transition hover:bg-[#D4AF37]/10 active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isEnquireLoading ? "Opening..." : "Enquire"}
              </button>
              <div className="sm:ml-auto">
                <button
                  type="button"
                  onClick={handleSave}
                  aria-pressed={isSaved}
                  aria-label={`Save ${product.title}`}
                  className="flex h-12 w-12 items-center justify-center rounded-sm border border-[#3A3A3A] bg-[#111111] text-[#F5F5F5] transition hover:border-[#D4AF37] hover:text-[#D4AF37] active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  <Bookmark className={`h-4 w-4 ${isSaved ? "fill-current text-[#D4AF37]" : ""}`} />
                </button>
              </div>
            </div>
          </div>

          {isReserveOpen && (
            <div
              className="absolute inset-0 z-20 flex items-center justify-center bg-black/75 p-4"
              role="dialog"
              aria-modal="true"
              aria-labelledby="reserve-title"
            >
              <div className="w-full max-w-md rounded-sm border border-[#2F2F2F] bg-[#0A0A0A] p-6">
                <h3 id="reserve-title" className="text-xl font-semibold text-[#F5F5F5]">
                  Reservation Started
                </h3>
                <p className="mt-3 text-sm text-[#CFCFCF]">
                  {product.title} has been added to your reservation request.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => {
                      setIsReserveOpen(false);
                      navigate(`/contact?${new URLSearchParams({ subject: `Reservation request for ${product.title}`, ref: product.ref }).toString()}`);
                    }}
                    className="h-11 min-w-[140px] rounded-sm bg-[#D4AF37] px-5 text-sm font-medium uppercase tracking-[0.14em] text-black transition hover:brightness-110 active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                  >
                    Continue
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsReserveOpen(false)}
                    className="h-11 min-w-[120px] rounded-sm border border-[#D4AF37] px-5 text-sm font-medium uppercase tracking-[0.14em] text-[#D4AF37] transition hover:bg-[#D4AF37]/10 active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

          <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm border border-[#2F2F2F] bg-black/40 p-2 text-[#F5F5F5] transition hover:border-[#D4AF37] hover:text-[#D4AF37] focus:outline-none">
            <X className="h-6 w-6" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
