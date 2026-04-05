import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata('Privacy Policy | CreatorAILab', 'Privacy Policy for CreatorAILab.', '/privacy');

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl space-y-6 px-6 py-12">
      <h1 className="text-3xl font-bold text-slate-900">Privacy Policy</h1>
      <p className="text-slate-600">Last updated: March 2026</p>

      <h2 className="text-xl font-semibold text-slate-900">1. Information We Collect</h2>
      <p>
        CreatorAILab collects information you provide directly, such as your email address when you subscribe to our newsletter, 
        and usage data through analytics tools (e.g., page views, quiz completions) to improve our service.
      </p>

      <h2 className="text-xl font-semibold text-slate-900">2. How We Use Your Information</h2>
      <p>
        We use your information to send newsletters, personalize content, improve our platform, and communicate with you 
        about updates and relevant content.
      </p>

      <h2 className="text-xl font-semibold text-slate-900">3. Cookies and Tracking</h2>
      <p>
        We use cookies and similar technologies for analytics, to remember your preferences, and to improve your experience. 
        You can control cookie settings through your browser.
      </p>

      <h2 className="text-xl font-semibold text-slate-900">4. Third-Party Services</h2>
      <p>
        We use third-party services including analytics providers and email delivery services. These providers have their 
        own privacy policies governing how they handle your data.
      </p>

      <h2 className="text-xl font-semibold text-slate-900">5. Data Retention</h2>
      <p>
        We retain your data for as long as your account is active or as needed to provide services. You may request 
        deletion of your data at any time.
      </p>

      <h2 className="text-xl font-semibold text-slate-900">6. Your Rights</h2>
      <p>
        Depending on your location, you may have rights to access, correct, delete, or port your data, and to opt out 
        of certain processing. Contact us to exercise these rights.
      </p>

      <h2 className="text-xl font-semibold text-slate-900">7. Contact</h2>
      <p>
        For privacy-related questions, contact us through the methods provided on our website.
      </p>
    </article>
  );
}
