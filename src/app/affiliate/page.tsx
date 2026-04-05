import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata('Affiliate Disclosure | CreatorAILab', 'Affiliate disclosure for CreatorAILab.', '/affiliate');

export default function AffiliatePage() {
  return (
    <article className="mx-auto max-w-3xl space-y-6 px-6 py-12">
      <h1 className="text-3xl font-bold text-slate-900">Affiliate Disclosure</h1>
      <p className="text-slate-600">Last updated: March 2026</p>

      <h2 className="text-xl font-semibold text-slate-900">Our Affiliate Relationships</h2>
      <p>
        CreatorAILab participates in affiliate programs. When you click on links to AI tools and services 
        featured on our site and make a purchase or sign up, we may earn a commission at no additional cost to you.
      </p>

      <h2 className="text-xl font-semibold text-slate-900">How This Affects You</h2>
      <p>
        Our affiliate relationships do not influence our editorial content. We recommend tools based on 
        research, user feedback, and our assessment of value for creators. We only promote products we 
        believe are genuinely useful.
      </p>

      <h2 className="text-xl font-semibold text-slate-900">Transparency</h2>
      <p>
        We clearly label affiliate links where appropriate. Our goal is to help you discover the best 
        AI tools for your workflow while being transparent about how we sustain our platform.
      </p>

      <h2 className="text-xl font-semibold text-slate-900">Your Choice</h2>
      <p>
        You are never obligated to use our affiliate links. You can visit tool websites directly if you 
        prefer. We appreciate your support when you do use our links, as it helps us continue creating 
        free content for creators.
      </p>

      <h2 className="text-xl font-semibold text-slate-900">Questions</h2>
      <p>
        If you have questions about our affiliate relationships, contact us through the methods provided 
        on our website.
      </p>
    </article>
  );
}
