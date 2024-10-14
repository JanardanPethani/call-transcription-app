"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import Link from "next/link";

export default function Contact() {
  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Contact Us</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <p className="text-lg mb-2">Get in touch with us directly:</p>
            <Link
              href="mailto:contact@transcriptionapp.com"
              className="flex items-center text-primary hover:underline"
            >
              <Mail className="mr-2 h-5 w-5" />
              contact@transcriptionapp.com
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
