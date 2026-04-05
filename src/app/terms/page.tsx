import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata('Terms of Service | CreatorAILab', 'Terms of Service for CreatorAILab.', '/terms');

export default function TermsPage() {
  return (
    <article className="mx-auto max-w-3xl space-y-6 px-6 py-12">
      <h1 className="text-3xl font-bold text-slate-900">Terms of Service</h1>
      <p className="text-slate-600">Last updated: March 2026</p>

      <h2 className="text-xl font-semibold text-slate-900">1. Acceptance of Terms</h2>
      <p>
        By accessing or using CreatorAILab, you agree to be bound by these Terms of Service. If you do not agree, 
        please do not use our services.
      </p>

      <h2 className="text-xl font-semibold text-slate-900">2. Use of Service</h2>
      <p>
        CreatorAILab provides AI tools discovery, workflow guides, and related content. You agree to use the service 
        only for lawful purposes and in accordance with these terms.
      </p>

      <h2 className="text-xl font-semibold text-slate-900">3. Intellectual Property</h2>
      <p>
        The content, design, and materials on CreatorAILab are owned by us or our licensors. You may not copy, 
        modify, or distribute our content without permission.
      </p>

      <h2 className="text-xl font-semibold text-slate-900">4. Third-Party Links</h2>
      <p>
        Our site includes links to third-party tools and services. We are not responsible for the content, 
        privacy practices, or availability of these external sites.
      </p>

      <h2 className="text-xl font-semibold text-slate-900">5. Disclaimer</h2>
      <p>
        Our content is provided for informational purposes. We do not guarantee the accuracy of tool reviews 
        or recommendations. Use your own judgment when making decisions based on our content.
      </p>

      <h2 className="text-xl font-semibold text-slate-900">6. Limitation of Liability</h2>
      <p>
        To the fullest extent permitted by law, CreatorAILab shall not be liable for any indirect, incidental, 
        special, or consequential damages arising from your use of our service.
      </p>

      <h2 className="text-xl font-semibold text-slate-900">7. Changes</h2>
      <p>
        We may update these terms from time to time. Continued use of the service after changes constitutes 
        acceptance of the updated terms.
      </p>

      <h2 className="text-xl font-semibold text-slate-900">8. Contact</h2>
      <p>
        For questions about these terms, contact us through the methods provided on our website.
      </p>
    </article>
  );
}
