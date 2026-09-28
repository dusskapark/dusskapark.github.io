export const site = {
  name: "Hey, Joo",
  author: "Joo Hyung Park",
  url: "https://api.metadata.co.kr",
  description:
    "Product builder designing AI/ML, developer experience, and tech infrastructure products since 2012.",
  email: "dusskapark@gmail.com",
};

export const isPreview =
  process.env.VERCEL_ENV === "preview" || process.env.PORTFOLIO_PREVIEW === "1";
