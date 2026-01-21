"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Clock, FileText, Shield } from "lucide-react";

export function HelpPolicy() {
  return (
    <Card className="h-full border-none shadow-none bg-transparent">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="text-2xl flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" />
            Support Policy
        </CardTitle>
        <CardDescription>
          Please review our guidelines before submitting a ticket.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
          <AccordionItem value="item-1">
            <AccordionTrigger>
                <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>Response Times</span>
                </div>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              We aim to respond to all support tickets within <strong>24 hours</strong> during regular business days (Monday - Friday). 
              For critical issues affecting production environments, we strive for a 4-hour initial response time.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-2">
            <AccordionTrigger>
                <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    <span>Scope of Support</span>
                </div>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              <ul className="list-disc pl-4 space-y-1">
                  <li>Bug fixes for verified issues in our software.</li>
                  <li>Guidance on standard features and configuration.</li>
                  <li>Assistance with billing and account management.</li>
                  <li><strong>Note:</strong> Custom development and third-party integrations are not covered under standard support.</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>
                 <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-muted-foreground" />
                    <span>Urgent Matters</span>
                </div>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              {`If you are experiencing a complete service outage or data loss event, please select "Critical" priority in the contact form. 
              Misuse of the critical priority flag may result in deprioritization of future requests.`}
            </AccordionContent>
          </AccordionItem>
          
           <AccordionItem value="item-4">
            <AccordionTrigger>
                 <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span>Code of Conduct</span>
                </div>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Our team treats everyone with respect, and we expect the same in return. Abusive language, threats, or harassment will result in immediate termination of support services.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
