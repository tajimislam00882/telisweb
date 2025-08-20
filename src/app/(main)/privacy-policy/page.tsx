import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PrivacyPolicyPage() {
  return (
    <div className="container py-12 text-foreground">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-lg dark:prose-invert max-w-none space-y-6">
          <p>
            Welcome to Telisweb. We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
          </p>

          <section>
            <h2 className="text-2xl font-semibold">1. Information We Collect</h2>
            <p>
              We may collect personal information such as your name, email address, and payment information when you register, make a purchase, or communicate with us. We also collect non-personal information, such as browser type, operating system, and website usage data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">2. How We Use Your Information</h2>
            <p>
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Process your transactions and deliver the products you purchase.</li>
              <li>Communicate with you, including sending order confirmations and customer service responses.</li>
              <li>Improve our website and services.</li>
              <li>Send you promotional materials, from which you can opt-out at any time.</li>
            </ul>
          </section>
          
           <section>
            <h2 className="text-2xl font-semibold">3. Information Sharing and Disclosure</h2>
            <p>
              We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties except for trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">4. Data Security</h2>
            <p>
              We implement a variety of security measures to maintain the safety of your personal information. Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">5. Your Rights</h2>
            <p>
              You have the right to access, correct, or delete your personal information. You can do so by logging into your account dashboard or by contacting us directly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">6. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@telisweb.com" className="text-primary hover:underline">privacy@telisweb.com</a>.
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
