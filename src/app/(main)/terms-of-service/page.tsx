import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TermsOfServicePage() {
  return (
    <div className="container py-12 text-foreground">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Terms of Service</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-lg dark:prose-invert max-w-none space-y-6">
          <p>
            Please read these Terms of Service ("Terms") carefully before using the Telisweb website (the "Service") operated by us. Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms.
          </p>

          <section>
            <h2 className="text-2xl font-semibold">1. Accounts</h2>
            <p>
              When you create an account with us, you must provide us with information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">2. Digital Products</h2>
            <p>
              Our Service allows you to purchase digital products. By purchasing a product, you are granted a non-exclusive, non-transferable license to use the product for personal or commercial purposes as specified in the product's license agreement. You may not redistribute, resell, or share the product files.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">3. Payments and Refunds</h2>
            <p>
              All payments are processed through secure third-party payment gateways. Due to the digital nature of our products, all sales are final. We do not offer refunds unless a product is proven to be defective or not as described.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">4. Intellectual Property</h2>
            <p>
              The Service and its original content (excluding content provided by users), features, and functionality are and will remain the exclusive property of Telisweb and its licensors.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">5. Termination</h2>
            <p>
              We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">6. Governing Law</h2>
            <p>
              These Terms shall be governed and construed in accordance with the laws of Bangladesh, without regard to its conflict of law provisions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at <a href="mailto:support@telisweb.com" className="text-primary hover:underline">support@telisweb.com</a>.
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
