"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { PersonStanding } from "lucide-react";
import Link from "next/link";
import { useForm, FormProvider } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});

export default function LoginPage() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const handleSubmit = (data: z.infer<typeof formSchema>) => {
        console.log("login form submitted", data);
    };

    return (
        <>
            <PersonStanding size={50} className="text-white-500" />
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Log in</CardTitle>
                    <CardDescription>
                        <p>Log in to your SupportMe Account</p>
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
                                        <FormDescription>
                                            This is the email address you signed up to SupportMe
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input placeholder="********" type="password" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Enter your password
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">Log in</Button>
                        </form>
                    </FormProvider>
                </CardContent>
                <CardFooter className="flex gap-2 items-center justify-between">
                    <small>Don't have an account?</small>
                    <Button asChild variant="outline" size="sm">
                        <Link href="/sign-up">Sign Up</Link>
                    </Button>
                </CardFooter>
            </Card>
        </>
    );
}