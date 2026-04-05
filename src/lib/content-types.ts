/** Content model shapes (previously mirrored Prisma models; app is static-catalog only). */

export type ToolCategory =
  | 'writing'
  | 'video'
  | 'image'
  | 'automation'
  | 'marketing'
  | 'productivity'
  | 'customer_support';

export type PricingType = 'free' | 'freemium' | 'paid';

export type Tool = {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: ToolCategory;
  pricingType: PricingType;
  pricingDetails: string | null;
  pros: string[];
  cons: string[];
  bestFor: string | null;
  affiliateUrl: string;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type Workflow = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  featuredImage: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type Prompt = {
  id: string;
  title: string;
  category: string;
  content: string;
  gated: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type Comparison = {
  id: string;
  title: string;
  slug: string;
  verdict: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};

export type WorkflowWithTools = Workflow & { toolsUsed: Tool[] };

export type ComparisonWithTools = Comparison & { tools: Tool[] };
