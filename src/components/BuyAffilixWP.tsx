"use client";

export default function BuyAffilixWP() {
  const startCheckout = async () => {
    const res = await fetch("/api/razorpay/create-subscription", {
      method: "POST",
    });

    const data = await res.json();

    if (!data.success) {
      alert("Unable to start checkout");
      return;
    }

    openRazorpay(data.subscription_id);
  };

  const openRazorpay = (subscriptionId: string) => {
    const options = {
      key: process.env.NEXT_PUBLIC_RP_KEY_ID, // public key
      subscription_id: subscriptionId,
      name: "AffilixWP",
      description: "Affiliate & Commission Tracking for WordPress",
      handler: function (response: any) {
        // Payment completed
        window.location.href = "/success";
      },
      theme: {
        color: "#2563EB",
      },
    };

    // @ts-ignore
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <button
      onClick={startCheckout}
      className="px-6 py-3 bg-blue-600 text-white rounded-lg"
    >
      Buy AffilixWP
    </button>
  );
}
