import Container from "@/components/layout/Container";

export default function TermsContentSection() {
  return (
    <>
      <Container as="section" background="white" className="space-y-8 py-16">
        <h2 className="text-3xl font-bold text-gray-800">
          Terms &amp; Conditions
        </h2>
        <p className="text-gray-600">
          By accessing or using Acadavault’s website or services, you agree to
          these Terms &amp; Conditions and our Privacy Policy. Please read them
          carefully—continued use constitutes acceptance. We may update these
          terms at any time; changes take effect upon posting.
        </p>

        {/* 1. Use of Services */}
        <div className="prose max-w-4xl mx-auto text-gray-700">
          <h3 className="text-xl font-semibold mt-6">1. Use of Our Platform</h3>
          <p>
            Acadavault provides academic resources and tools—plagiarism checks,
            proofreading, reference generators, and more. You must comply with
            all applicable laws and academic integrity policies. Unauthorized or
            unlawful use is strictly prohibited.
          </p>

          {/* 2. Account Security */}
          <h3 className="text-xl font-semibold mt-6">2. Account Security</h3>
          <p>
            If you register for an account, keep your credentials confidential.
            You are responsible for all activity under your login. Notify us
            immediately of any unauthorized use.
          </p>

          {/* 3. Intellectual Property & License */}
          <h3 className="text-xl font-semibold mt-6">
            3. Intellectual Property &amp; Licensing
          </h3>
          <p>
            All content on Acadavault remains the property of its original
            creators or Acadavault. You receive a limited, revocable license to
            access and use materials for personal, non‑commercial purposes only.
            Redistribution, reproduction, or public display without our
            permission is forbidden.
          </p>

          {/* 4. User‑Generated Content */}
          <h3 className="text-xl font-semibold mt-6">
            4. User‑Generated Content
          </h3>
          <p>
            By uploading or posting any content (projects, articles,
            discussions), you grant Acadavault a worldwide, royalty‑free,
            perpetual license to use, modify, and distribute it in connection
            with our services. You represent that you have all necessary rights
            to submit such content.
          </p>

          {/* 5. Payments, Refunds & Fees */}
          <h3 className="text-xl font-semibold mt-6">
            5. Payments, Refunds &amp; Fees
          </h3>
          <p>
            All transactions are processed via secure payment gateways. Fees are
            non‑refundable except as required by law or our published refund
            policy. We reserve the right to change pricing and fees at any time.
          </p>

          {/* 6. Limitation of Liability */}
          <h3 className="text-xl font-semibold mt-6">
            6. Limitation of Liability
          </h3>
          <p>
            To the fullest extent permitted by law, Acadavault and its
            affiliates will not be liable for any indirect, incidental, or
            consequential damages arising from your use of the platform. Our
            total liability is capped at the amount you paid us in the last
            twelve months.
          </p>

          {/* 7. Third‑Party Links & Services */}
          <h3 className="text-xl font-semibold mt-6">
            7. Third‑Party Links &amp; Services
          </h3>
          <p>
            Our site may link to third‑party resources. We don’t endorse and are
            not responsible for their content, accuracy, or practices. Visiting
            these sites is at your own risk.
          </p>

          {/* 8. Indemnification */}
          <h3 className="text-xl font-semibold mt-6">8. Indemnification</h3>
          <p>
            You agree to indemnify and hold harmless Acadavault, its officers,
            and affiliates from any claims, losses, or damages arising out of
            your violation of these terms or your misuse of the platform.
          </p>

          {/* 9. Termination */}
          <h3 className="text-xl font-semibold mt-6">9. Termination</h3>
          <p>
            We may suspend or terminate your access at our discretion, without
            notice, if you breach any provision hereof. Surviving provisions
            (e.g., indemnity, intellectual property, limitation of liability)
            will continue in effect.
          </p>

          {/* 10. Governing Law & Dispute Resolution */}
          <h3 className="text-xl font-semibold mt-6">
            10. Governing Law &amp; Dispute Resolution
          </h3>
          <p>
            These terms are governed by the laws of Nigeria. Any disputes shall
            be resolved in Nigerian courts or through binding arbitration in
            Lagos.
          </p>

          {/* 11. Miscellaneous */}
          <h3 className="text-xl font-semibold mt-6">11. Miscellaneous</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Modification:</strong> We may update these terms at any
              time; your continued use signifies acceptance.
            </li>
            <li>
              <strong>Severability:</strong> If a provision is invalid, the
              remainder still applies.
            </li>
            <li>
              <strong>Assignment:</strong> Acadavault may transfer its rights
              without notice; you may not assign your rights.
            </li>
            <li>
              <strong>Entire Agreement:</strong> These Terms, together with our
              Privacy Policy, constitute the entire agreement between you and
              Acadavault.
            </li>
          </ul>

          <p className="mt-6">
            For full details or questions, please contact{" "}
            <a
              href="mailto:legal@acadevault.com"
              className="text-blue-600 hover:underline"
            >
              legal@acadevault.com
            </a>
            .
          </p>
        </div>
      </Container>
    </>
  );
}
