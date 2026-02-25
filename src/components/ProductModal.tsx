import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

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
            "fixed inset-0 z-50 flex flex-col md:flex-row bg-onyx text-white",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          )}
        >
          {/* left side: image */}
          <div className="md:w-1/2 flex items-center justify-center p-4 bg-black">
            <img
              src={product.image}
              alt={product.title}
              className="max-w-full max-h-full object-contain"
            />
          </div>

          {/* right side: details */}
          <div className="md:w-1/2 flex flex-col justify-between p-6 bg-gradient-to-b from-onyx via-black to-onyx">
            <div>
              <h2 className="text-3xl font-bold text-gold">{product.title}</h2>
              <p className="mt-1 text-sm text-gray-400">Ref: {product.ref}</p>

              <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                {Object.entries(product.specs).map(([key, val]) => (
                  <div key={key} className="flex">
                    <span className="w-1/2 font-semibold capitalize">
                      {key.replace(/([A-Z])/g, " $1")}
                    </span>
                    <span className="w-1/2">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <p className="text-xl font-semibold">{product.price}</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <button className="px-4 py-2 border border-gold text-gold rounded hover:bg-gold/10 transition">
                  Save
                </button>
                <button className="px-4 py-2 bg-gold text-onyx rounded hover:bg-gold/90 transition">
                  Enquire
                </button>
                <button className="px-4 py-2 bg-gold/80 text-onyx rounded hover:bg-gold transition">
                  Reserve&nbsp;Now
                </button>
              </div>
            </div>
          </div>

          <DialogPrimitive.Close className="absolute top-4 right-4 text-white hover:text-gold focus:outline-none">
            <X className="h-6 w-6" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
