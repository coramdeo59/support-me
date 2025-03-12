"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, PersonStanding } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import Link from "next/link";
import { useForm, FormProvider } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";

const formSchema = z.object({
    email: z.string().email(),
    accountType: z.enum(["Personal", "Company"]),
    companyName: z.string().optional(),
    numberOfEmployees: z.coerce.number().optional(),
    dob: z.coerce.date().refine((date) => {
        const today = new Date();
        const eighteenYearsAgo = new Date(
            today.getFullYear() - 18,
            today.getMonth(),
            today.getDate()
        );
        return date <= eighteenYearsAgo;
    }, {
        message: "You must be 18 or older to sign up"
    }),
}).superRefine((data, ctx) => {
    if (data.accountType === "Company" && !data.companyName) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["companyName"],
            message: "Company name is required",
        });
    }
    if (
        data.accountType === "Company" &&
        (!data.numberOfEmployees || data.numberOfEmployees < 0)
    ) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["numberOfEmployees"],
            message: "Number of employees is required",
        });
    }
});

export default function SignUpPage() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            accountType: "Personal",
            numberOfEmployees: "",
        },
    });

    const handleSubmit = (data: z.infer<typeof formSchema>) => {
        console.log("sign up form submitted", data);
    };
    const accountType = form.watch("accountType");
    const dobFromDate = new Date();
    dobFromDate.setFullYear(dobFromDate.getFullYear() - 120);
    return (
        <>
            <PersonStanding size={50} className="text-white-500" />
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Sign Up</CardTitle>
                    <CardDescription>
                        <p>Sign up for a new SupportMe account</p>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <FormProvider {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="melkam@gmail.com" type="email" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="accountType"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Account Type</FormLabel>
                                        <Select onValueChange={field.onChange} >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select an account type" />
                                                </SelectTrigger>                                            
                                            </FormControl>
                                            <SelectContent>
                                            <SelectItem value="Personal">Personal</SelectItem>
                                            <SelectItem value="Company">Company</SelectItem>
                                        </SelectContent>
                                        </Select>

                                   </FormItem> 
                                )}
                            
                            />
                            {
                                accountType === "Company" && 
                             <>
                              <FormField
                                control={form.control}
                                name="companyName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Company name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Company name" type="name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                                    />
                                <FormField
                                control={form.control}
                                name="numberOfEmployees"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>employees</FormLabel>
                                        <FormControl>
                                            <Input type="number" min={0} placeholder="Employees" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                                />
                            </>
                            }
                            <FormField
                                control={form.control}
                                name="dob"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col space-y-3">
                                        <FormLabel>Data of birth</FormLabel>
                                        <Popover>
                                                
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button variant="outline" className="normal-case flex justify-between pr-1">
                                                        {!!field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                                        
                                                        <CalendarIcon size={20} />
 
                                                   </Button>
                                                </FormControl>
                                          </PopoverTrigger>
                                            <PopoverContent align="start" className="w-auto p-0">
                                                <Calendar
                                                    mode="single"                                    
                                                    defaultMonth={field.value} 
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    fixedWeeks
                                                    weekStartsOn={1}
                                                    fromDate={dobFromDate}
                                                    toDate={new Date()}
                                                    captionLayout="dropdown-buttons"
                                                />
                                            </PopoverContent>
                                          </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                                />
                            <Button type="submit">Sign up</Button>
                        </form>
                    </FormProvider>
                </CardContent>
                <CardFooter className="flex gap-2 items-center justify-between">
                    <small>Already have an account?</small>
                    <Button asChild variant="outline" size="sm">
                        <Link href="/login">Log in</Link>
                    </Button>
                </CardFooter>
            </Card>
        </>
    );
}