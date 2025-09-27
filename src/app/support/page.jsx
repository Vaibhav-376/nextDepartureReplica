"use client"

import React, { useState } from "react";

const Support = () => {

    const [openIndex, setOpenIndex] = useState(-1);
    const toggleFAQ = (i) => {
        setOpenIndex(openIndex === i ? -1 : i);
    };

    const faqs = [
        { id: 1, question: "How do I cancel my Subsciption", ans: "" },
        { id: 2, question: "How do I subscribe", ans: "Subscribe Here" },
        { id: 3, question: "How Many deal notification will i get", ans: "We promise to never spam you with mediocre deals! Our only incentive is to find flight deals that save you hundreds of dollars.For exclusive subscribers: Based on selection of receiving deals from all destinations , the number of deals per month you’ll get from:Toronto – 12 to 16Vancouver – 10 to 14Montreal – 10 to 14Calgary – 10 to 14Edmonton – 6 to 9Ottawa – 6 to 8Limited subscribers will only receive 25% of all deals." },
        { id: 4, question: "Why haven't I received any deals from you?", ans: "Not to worry! It’s more than likely we haven’t found a deal based on your departure & destination region. We recommend you select “ALL” to receive every deal from us. We only send you the best of the best flight deals!" },
    ]

    const general = [
        { id: 1, question: "Can I select Specific Dates?", ans: "We don’t give you an option of selecting specific dates because it would be very difficult to find a deal based on your exact criteria. The more flexible your dates are, the more likely you’re able to take advantage of the deals we send out." },
        { id: 2, question: "Do You find hotel, vacation or curises deals", ans: "On rare occasions, we’ll post them. They’re extremely difficult deals to find" },
        { id: 3, question: "Do You find deals from canada?", ans: "Yes, we currently on find deals from Canada however we do plan on expanding to other countries in the near future." },
        { id: 4, question: "Do you only post out economy fare deals?", ans: "Yes we only post economy deals since business class rarely fluctuate in price." },
        { id: 5, question: "From which cities do you find flights from?", ans: "We find deals from 6 Canadian cities including Vancouver, Calgary, Edmonton, Toronto, Ottawa & Montreal." },
        { id: 6, question: "How do I book a deal?", ans: "We provide you with easy, simple and clear booking instructions, availability and example dates. Ultimately we’re not a travel agency so we redirect you book directly with the airline or an online travel agency (OTA)." },
        { id: 7, question: "How do I reset my password?", ans: "You can reset your password by clicking the “Forgot Password” option at the login page.Alternatively, you can go to this link: https://app.nextdeparture.ca/password/reset" },
        { id: 8, question: "How long do deals last?", ans: "Most deals we find tend to last under 48 hours. Mistake/error fares are even less — usually within a couple of hours from the time we post. We always recommend to book as soon as possible. Here’s a tip: Most airlines offer a 24 hour free cancellation policy, which gives you a bit of time to decide. We’ll try to make note of it whenever we can in our deal posts." },
        { id: 9, question: "Is your app free?", ans: "Yes! Our app is completely free to use. We do have an option of subscribing to unlock additional key features such as personalized deal alerts, push notifications and much more." },
        { id: 10, question: "The deals you post — are they legitimate?", ans: "Yes the deals we send you are 100% legit. We verify the booking up until the billing page to see if the price is actually valid." },
        { id: 11, question: "What is the difference between non-subscribers and subscribers?", ans: "Here’s what subscribers get:Instant Push Notifications & Instant Emails Customized Deals No ads No affiliate links on deals Here’s what non-subscribers get: Access to all deals Ads and affiliate links on deals Weekly Newsletter" },
        { id: 12, question: "Why don't I See my departure", ans: "At this time we only find deals out of Canada. If you don’t see you’re Canadian Departure, it’s due to the lack of deals out of your city." }
    ]

    const billing = [
        { id: 1, question: "It’s not letting me update my credit card", ans: "It might mean you’re still on our older billing system where there is no option to change payment methods. Please resubscribe on our newer billing system at nextdeparture.ca/subscribe and email us at support@nextdeparture.ca so that w can cancel your older account. You can also login to your account and change your billing information in your Account Settings." },
        { id: 2, question: "What is your refund policy?", ans: "With our money-back guarantee, you can cancel anytime within 30 days and get a full refund. Please note, refunds are not automatic and need to be requested by email. If it’s past 30 days, please email us and we can take your request case by case. " },
        { id: 3, question: "Will my subscription automatically renew?", ans: "Yes, unless you cancel it, your subscription will automatically renew at the end of the subscription period. The subscription also automatically cancels if a renewal charge attempt is failed such as an expired credit card." }
    ]

    const technical = [
        { id: 1, question: "How do I download the app?", ans: "Search for “Last Call Trips” on your Google Play or App Store." },
        { id: 2, question: "Where is the Facebook login?", ans: "Effective September 13, 2023, we will be discontinuing the option to log in using Facebook social login on our platform. To access your account, you will need to reset your password and log in using your email address associated with your account.How to Transition:Reset Your Password: If you have previously used Facebook to log in, you will need to reset your password. To do this, visit ourwebsite or open our mobile app and click on the “Forgot Password” link. You will receive an email with instructions on how tocreate a new password. Alternatively, you can reset your password at this link.Login with Email: Once your password is reset, you can use your email address and new password to log in securely.If you encounter any issues during this change, please don’t hesitate to reach out to us at support@nextdeparture.ca forassistance." },

        { id: 3, question: "Why am I not receiving email notifications?", ans: "Make sure you double check the following:Make sure you have turned email notifications on. You can do this directly on the app under Deal Alerts, or you can check off “Email Notifications” here after (after you log on)Are you deal alerts set? If yes, are they set to the departure and destination correctly?Are you subscribed?If it’s still not working, please contact us at support@nextdeparture.ca" },

        { id: 4, question: "Why am I not receiving push notifications?", ans: "Make sure you double check the following:Make sure your device’s push notifications are turned on. For iOS devices, they ask you to allow notifications when you first installed our app. For iOS/Apple devices, go to your Settings > Notifications > Last Call Trips > Make sure “Allow Notifications” toggle is on Are you deal alerts set? If yes, are they set to the departure and destination correctly?Are you subscribed? If it’s still not working, please contact us at support@nextdeparture.ca Update: January 2023, for iOS users not receiving push notifications, please update your device to iOS 16.2 or higher." },

        { id: 5, question: "Why is my subscription not active?", ans: "If your subscription is active with iOS subscriptions, it may disconnect with the Last Call Trips app. It can be fixed by going on to the Subscription page of the Last Call Trips app, and hitting “Restore Purchases“." },
    ]

    const stillquestion = [
        { id: 1, question: "I still have questions. How do I contact you?", ans: "You can email us here. We’ll do our very best to answer your questions within 24 hours 🙂" },
    ]


    const [formData, setFormData] = useState({
        name: "",
        email: "",
        howCanWeHelp: "",
        description: "",
        subscription: "",
        howSubscribe: "",
        deviceType: "",
    });

    const [status, setStatus] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("Submitting...");

        try {
            const res = await fetch("/api/support", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (res.ok) {
                setStatus("✅ Submitted successfully!");
            } else {
                setStatus(`❌ ${data.message}`);
            }
        } catch (err) {
            console.error(err);
            setStatus("❌ Something went wrong.");
        }
    };


    return (
        <div className="px-4 py-10">

            <div className="flex items-center justify-center mb-10">
                <h1 className="text-3xl font-bold text-gray-800">
                    We're here to help!
                </h1>
            </div>


            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-6 rounded-2xl shadow bg-white">
                    <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
                    <p className="text-gray-600">
                        Find quick answers to common questions about our services.
                    </p>
                    <h1 className="mt-10 font-bold text-xl">Subscirption</h1>
                    {faqs.map((q, i) => (
                        <div key={i}>
                            <button
                                onClick={() => toggleFAQ(i)}
                                className="flex justify-between w-full text-left font-bold py-3 border-b ">
                                {q.question}
                                <span>{openIndex === i ? "▲" : "▶"}</span>
                            </button>
                            {openIndex === i && (
                                <p className="mt-2 text-md text-gray-600">
                                    This is the answer for "{q.ans}"
                                </p>
                            )}
                        </div>
                    ))}
                    <h1 className="mt-10 font-bold text-xl">General</h1>
                    {general.map((q, i) => (
                        <div key={i}>
                            <button
                                onClick={() => toggleFAQ(i)}
                                className="flex justify-between w-full text-left font-bold py-3 border-b ">
                                {q.question}
                                <span>{openIndex === i ? "▲" : "▶"}</span>
                            </button>
                            {openIndex === i && (
                                <p className="mt-2 text-md text-gray-600">
                                    This is the answer for "{q.ans}"
                                </p>
                            )}
                        </div>
                    ))}
                    <h1 className="mt-10 font-bold text-xl">Billing</h1>
                    {billing.map((q, i) => (
                        <div key={i}>
                            <button
                                onClick={() => toggleFAQ(i)}
                                className="flex justify-between w-full text-left font-bold py-3 border-b ">
                                {q.question}
                                <span>{openIndex === i ? "▲" : "▶"}</span>
                            </button>
                            {openIndex === i && (
                                <p className="mt-2 text-md text-gray-600">
                                    This is the answer for "{q.ans}"
                                </p>
                            )}
                        </div>
                    ))}

                    <h1 className="mt-10 font-bold text-xl">Technical</h1>
                    {technical.map((q, i) => (
                        <div key={i}>
                            <button
                                onClick={() => toggleFAQ(i)}
                                className="flex justify-between w-full text-left font-bold py-3 border-b ">
                                {q.question}
                                <span>{openIndex === i ? "▲" : "▶"}</span>
                            </button>
                            {openIndex === i && (
                                <p className="mt-2 text-md text-gray-600">
                                    This is the answer for "{q.ans}"
                                </p>
                            )}
                        </div>
                    ))}

                    <h1 className="mt-10 font-bold text-xl">Still Got Questions?</h1>
                    {stillquestion.map((q, i) => (
                        <div key={i}>
                            <button
                                onClick={() => toggleFAQ(i)}
                                className="flex justify-between w-full text-left font-bold py-3 border-b ">
                                {q.question}
                                <span>{openIndex === i ? "▲" : "▶"}</span>
                            </button>
                            {openIndex === i && (
                                <p className="mt-2 text-md text-gray-600">
                                    This is the answer for "{q.ans}"
                                </p>
                            )}
                        </div>
                    ))}
                </div>

                <div className="p-6 rounded-2xl shadow bg-white max-w-lg mx-auto">
                    <h2 className="text-xl font-semibold mb-4 text-center">Contact Us</h2>
                    <p className="text-gray-600 mb-6">
                        Can’t find what you’re looking for? Reach out to our support team.
                    </p>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Name"
                                className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-blue-200"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email"
                                className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-blue-200"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                How can we help? <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="howCanWeHelp"
                                value={formData.howCanWeHelp}
                                onChange={handleChange}
                                className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-blue-200">
                                <option value="">Select an option</option>
                                <option value="cancel">Cancel Subscription</option>
                                <option value="notifications">Not Receiving Notifications</option>
                                <option value="subscription">Doesn't Recognize Subscription</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Please describe <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                rows="3"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Cancel subscription, Not receiving notifications, Doesn’t recognize my subscription, etc."
                                className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-blue-200"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Do you have a subscription?
                            </label>
                            <div className="space-y-1">
                                <label className="flex items-center gap-2">
                                    <input type="radio"
                                        name="subscription"
                                        value="true"
                                        checked={formData.subscription === "true"}
                                        onChange={handleChange} />
                                    Yes
                                </label>
                                <label className="flex items-center gap-2">
                                    <input type="radio" name="subscription"
                                        value="false"
                                        checked={formData.subscription === "false"}
                                        onChange={handleChange} />
                                    No
                                </label>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                How did you subscribe?
                            </label>
                            <div className="space-y-1">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="howSubscribe"
                                        value="stripe"
                                        checked={formData.howSubscribe === "stripe"}
                                        onChange={handleChange}
                                    />
                                    Last Call Trips Website Stripe
                                </label>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="howSubscribe"
                                        value="ios"
                                        checked={formData.howSubscribe === "ios"}
                                        onChange={handleChange}
                                    />
                                    iOS
                                </label>
                                <label className="flex items-center gap-2">
                                    <input type="radio"
                                        name="howSubscribe"
                                        value="google"
                                        checked={formData.howSubscribe === "google"}
                                        onChange={handleChange} />
                                    Google Play
                                </label>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Device Type and Model
                            </label>
                            <input
                                type="text"
                                name="deviceType" 
                                value={formData.deviceType}
                                onChange={handleChange}
                                placeholder="iPhone 13, S22+, etc"
                                className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-blue-200"
                            />

                        </div>

                        <button
                            type="submit"
                            className="w-full bg-sky-400 text-white font-medium py-2 rounded-md hover:bg-sky-500"
                        >
                            Send
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Support;
