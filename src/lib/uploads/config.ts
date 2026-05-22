export const uploadConfig = {
  maxFileSizeBytes: 10 * 1024 * 1024,
  maxFilesPerRequest: 1,
  rateLimit: {
    limit: 10,
    windowMs: 10 * 60 * 1000,
  },
  allowedMimeTypes: [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/svg+xml",
    "application/pdf",
  ],
  allowedExtensions: [".jpg", ".jpeg", ".png", ".webp", ".svg", ".pdf"],
};

export type UploadValidationResult =
  | { valid: true; extension: string }
  | { valid: false; message: string };
