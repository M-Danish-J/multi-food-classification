"use client";

import { Upload, Image as ImageIcon } from "lucide-react";
import { useCallback, useState } from "react";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  onImageSelected: (file: File, imageUrl: string) => void;
  disabled?: boolean;
}

export function ImageUpload({ onImageSelected, disabled }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) {
        alert("Please upload an image file");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        onImageSelected(file, imageUrl);
      };
      reader.readAsDataURL(file);
    },
    [onImageSelected]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);

      if (disabled) return;

      const file = e.dataTransfer.files[0];
      if (file) {
        handleFile(file);
      }
    },
    [handleFile, disabled]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        handleFile(file);
      }
    },
    [handleFile]
  );

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={cn(
        "relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed transition-all duration-300",
        "min-h-[400px] px-8 py-12",
        isDragging && !disabled
          ? "border-primary bg-primary/5 scale-105"
          : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/20",
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      <div className="flex flex-col items-center gap-6 text-center">
        <div
          className={cn(
            "rounded-full p-6 transition-all duration-300",
            "bg-gradient-to-br from-primary/20 to-accent/20",
            isDragging && "scale-110 rotate-6"
          )}
        >
          {isDragging ? (
            <ImageIcon className="h-12 w-12 text-primary animate-bounce" />
          ) : (
            <Upload className="h-12 w-12 text-muted-foreground" />
          )}
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl font-semibold tracking-tight">
            {isDragging ? "Drop your image here" : "Upload Food Image"}
          </h3>
          <p className="text-sm text-muted-foreground max-w-sm">
            Drag and drop an image, or click to browse your files
          </p>
        </div>

        <label
          htmlFor="file-upload"
          className={cn(
            "cursor-pointer rounded-full px-8 py-3 font-medium transition-all duration-200",
            "bg-primary text-primary-foreground hover:bg-primary/90",
            "shadow-lg hover:shadow-xl hover:scale-105",
            disabled && "pointer-events-none"
          )}
        >
          Choose Image
        </label>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={handleFileInput}
          disabled={disabled}
          className="hidden"
        />

        <p className="text-xs text-muted-foreground">
          Supports: JPEG, PNG, WebP
        </p>
      </div>
    </div>
  );
}
