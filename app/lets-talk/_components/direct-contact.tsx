"use client";

import { Mail, MapPin, Phone } from "lucide-react";

export function DirectContact() {
  return (
    <div className="flex flex-col md:flex-row gap-6 justify-center items-center text-center md:text-left">
        <div className="flex items-center gap-4 p-4 rounded-xl border bg-background hover:bg-muted/50 transition-colors cursor-pointer w-full md:w-auto">
            <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <Mail size={20} />
            </div>
            <div>
                <p className="text-xs text-muted-foreground font-medium">Email Us</p>
                <p className="text-sm font-semibold">hello@rubystudio.com</p>
            </div>
        </div>

        <div className="flex items-center gap-4 p-4 rounded-xl border bg-background hover:bg-muted/50 transition-colors cursor-pointer w-full md:w-auto">
            <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 flex items-center justify-center">
                <Phone size={20} />
            </div>
             <div>
                <p className="text-xs text-muted-foreground font-medium">Call Us</p>
                <p className="text-sm font-semibold">+880 1234 567 89</p>
            </div>
        </div>
        
         <div className="flex items-center gap-4 p-4 rounded-xl border bg-background hover:bg-muted/50 transition-colors cursor-pointer w-full md:w-auto">
            <div className="h-10 w-10 rounded-full bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 flex items-center justify-center">
                <MapPin size={20} />
            </div>
             <div>
                <p className="text-xs text-muted-foreground font-medium">Visit Us</p>
                <p className="text-sm font-semibold">Gulshan, Dhaka</p>
            </div>
        </div>
    </div>
  );
}
