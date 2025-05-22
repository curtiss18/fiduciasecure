import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation Bar */}
      <header className="border-b">
        <div className="container mx-auto flex justify-between items-center py-4">
          <div className="text-2xl font-bold">FiduciaSecure</div>
          <nav className="hidden md:flex gap-6">
            <a href="#features" className="hover:text-primary">Features</a>
            <a href="#solution" className="hover:text-primary">Solution</a>
            <a href="#audience" className="hover:text-primary">For Advisors</a>
          </nav>
          <div className="flex gap-4">
            <Button variant="outline" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Secure Form Collection Platform for Independent Financial Advisors
            </h1>
            <p className="text-xl mb-8">
              The all-in-one form collection, compliance, and client data management
              platform built for independent IARs. Collect client information — and secure it —
              faster, safer, and fully compliant.
            </p>
            <div className="flex gap-4">
              <Button size="lg" asChild>
                <Link href="/signup">Start Free Trial</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/signup">Request Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/* Problem Section */}
      <section className="py-16" id="solution">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">The Challenge</h2>
            <p className="mb-6">
              Independent financial advisors — especially solo IARs and small firms —
              are expected to compete in a digital-first world using tools that
              were never built for them. They struggle with a disconnected tech stack:
              generic contact forms with no compliance review, manual client intake processes, 
              insecure document collection, and no easy system for required
              client onboarding.
            </p>
            <p>
              This fragmentation not only wastes time but introduces
              compliance risks and friction at every step — from lead generation to
              account setup to regulatory check-ins. Advisors are forced to choose
              between growth and compliance — when they urgently need both.
            </p>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Our Solution</h2>
            <p className="mb-8">
              This platform delivers a complete client data collection, management, and
              compliance engine built specifically for independent IARs. It unifies
              form collection, secure data storage, compliance management, and client 
              onboarding workflows — all backed by real-time compliance review and 
              enterprise-grade security. From first click to fully onboarded and compliant 
              client, every step is automated, secure, and optimized for growth.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16" id="features">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Key Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-3">Secure Client Forms</h3>
              <p>Collect sensitive client information with bank-grade encryption, compliance controls, and secure data storage.</p>
            </div>
            
            {/* Feature 2 */}
            <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-3">Compliance Management</h3>
              <p>Real-time compliance review of all collected data with automated risk flagging and full audit trails.</p>
            </div>            
            {/* Feature 3 */}
            <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-3">Client Onboarding Workflow</h3>
              <p>Send secure, prefilled onboarding packets and route signed documents to ops automatically.</p>
            </div>
            
            {/* Feature 4 */}
            <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-3">Data Security</h3>
              <p>Enterprise-grade security with encrypted storage, secure document handling, and SOC 2 compliance.</p>
            </div>
            
            {/* Feature 5 */}
            <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-3">AI Compliance Review Engine</h3>
              <p>Real-time analysis of forms, data collection — with flagged risks, disclosure checks, and a full audit trail.</p>
            </div>
            
            {/* Feature 6 */}
            <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-3">Client Management</h3>
              <p>Centralized client data with interaction history, compliance tracking, and automated follow-ups.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Audience Section */}
      <section className="py-16 bg-muted" id="audience">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Who It&apos;s For</h2>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <span>Solo or small-firm independent IARs</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <span>Advisors launching new RIAs</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <span>Growth-minded fiduciaries seeking an all-in-one operations platform</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Grow Your Practice?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join hundreds of independent advisors who are streamlining their practice
            and growing their client base with our all-in-one platform.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/signup">Start Your Free Trial</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-xl font-bold mb-4 md:mb-0">FiduciaSecure</div>
            <div className="flex gap-8">
              <a href="#" className="hover:text-primary">Terms</a>
              <a href="#" className="hover:text-primary">Privacy</a>
              <a href="#" className="hover:text-primary">Contact</a>
            </div>
            <div className="mt-4 md:mt-0">
              © {new Date().getFullYear()} FiduciaSecure. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}