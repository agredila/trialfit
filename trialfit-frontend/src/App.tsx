import { useState, useEffect } from "react";
import { LandingPage } from "./components/landing/LandingPage";

interface Buddy {
  id: string;
  name: string;
  tier: "SILVER" | "GOLD" | "PRO";
  isVerified: boolean;
  rating: number;
  reviewCount: number;
  bio: string;
  gymLocation: string;
  price: number;
  imgUrl: string;
}

type ViewState = 
  | "splash" 
  | "signup" 
  | "onboarding-goal" 
  | "onboarding-location" 
  | "onboarding-schedule" 
  | "home-feed" 
  | "buddy-profile" 
  | "payment" 
  | "dashboard";

export default function App() {
  const [view, setView] = useState<ViewState>("splash");
  const [buddies, setBuddies] = useState<Buddy[]>([]);
  const [selectedBuddy, setSelectedBuddy] = useState<Buddy | null>(null);
  const [bookingHours, setBookingHours] = useState<number>(1);
  const [paymentMethod, setPaymentMethod] = useState<string>("bca");
  const [paymentState, setPaymentMethodState] = useState<"idle" | "processing" | "success">("idle");

  // Sign up inputs
  const [signUpName, setSignUpName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPhone, setSignUpPhone] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");

  // Onboarding Step 1: Goal selection
  const [selectedGoal, setSelectedGoal] = useState<string>("bulk");

  // Onboarding Step 2: Location inputs
  const [searchLocation, setSearchLocation] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [isTypingLocation, setIsTypingLocation] = useState(false);

  // Onboarding Step 3: Schedule selection
  const [selectedDays, setSelectedDays] = useState<Record<string, boolean>>({});
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);

  // Profile Scheduling selection states matching Google Stitch exactly
  const [selectedCalendarDay, setSelectedCalendarDay] = useState<number>(13); // Tue 13 default
  const [selectedProfileHour, setSelectedProfileHour] = useState<string>("09:00 - 10:00");

  // Search and Filter states for Home Feed
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  // Favorites tracking
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  // Load buddies from local or fall back to high-fidelity mock data matching stitch
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL ?? "http://localhost:3003"}/buddies`)
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          // Map backend entities to Stitch view presentation DTOs
          const mapped = json.data.map((b: any, idx: number) => ({
            id: b.id ?? `buddy-${idx}`,
            name: b.name ?? (b.tier === "PRO" ? "Sarah Jenkins" : "Marcus Chen"),
            tier: b.tier ?? "SILVER",
            isVerified: Boolean(b.isVerified),
            rating: b.rating ?? 0,
            reviewCount: b.reviewCount ?? 0,
            bio: b.bio ?? "",
            gymLocation: b.gymLocation ?? "",
            price: b.tier === "PRO" ? 150000 : 75000,
            imgUrl: idx === 0 
              ? "https://lh3.googleusercontent.com/aida-public/AB6AXuA-Dye8zUXFJqShasYU3EZdN-2RObemDNGDqKUEoD3Wz73s0bc6KmpFwL9C5Hp2g8PVeGiomNI3KpaE00gRJplDFoHvCpqO7RnPjHyWFUq7p3HWuleqn_LnBgI0mQn0t5tiJVi8rrx5x4iRBDaCoSPMZTcFOdT2P9HAm7bqyfiIAaNCbrsoRgnwQx3WhJO-91wvBaZaq_Du4IlX1Lqr-jp1uTgjypjHytrrlCRKJzDLgKeSIqsi1tNY1HHPlts2sMXghdybmdCvS44"
              : "https://lh3.googleusercontent.com/aida-public/AB6AXuDDw_kLmb4W8Uppex06eBgtyRGCACFB8HxMLZVuHJYRINFfaDHBqz1lFP94sEInuyajXg1K7tzhMu_9vAV8T-MHuL48lziIuRqFkH23hcwAVgAoiexf2HokAyhyh4-MQ4YKnTyk1ECFLDmBGjEQfTCIjYx_EM_d0dTRiQFKMcqFYBkMzbxslqYdupVS25VRGY8ZMrrePfajPbPDOMVdzaWKf3S4s8hnFEENbg7YQDzZXOePza1GQLTnTFGAhyohXszMUP1_T7ZwLIg"
          }));
          setBuddies(mapped);
        } else {
          loadMockBuddies();
        }
      })
      .catch(() => {
        console.warn("[TrialFit Client] Backend unreachable. Falling back to local high-fidelity mock data.");
        loadMockBuddies();
      });
  }, []);

  const loadMockBuddies = () => {
    setBuddies([
      {
        id: "a1a1a1a1-b2b2-c3c3-d4d4-e5e5e5e5e5e5",
        name: "Marcus Chen",
        tier: "GOLD",
        isVerified: true,
        rating: 4.9,
        reviewCount: 23,
        bio: "Specializing in hypertrophy and functional strength training. I help you hit your PRs while maintaining perfect form. My approach is data-driven and tailored to your specific fitness goals. Let's build a stronger you.",
        gymLocation: "Equinox, Downtown",
        price: 75000,
        imgUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuA-Dye8zUXFJqShasYU3EZdN-2RObemDNGDqKUEoD3Wz73s0bc6KmpFwL9C5Hp2g8PVeGiomNI3KpaE00gRJplDFoHvCpqO7RnPjHyWFUq7p3HWuleqn_LnBgI0mQn0t5tiJVi8rrx5x4iRBDaCoSPMZTcFOdT2P9HAm7bqyfiIAaNCbrsoRgnwQx3WhJO-91wvBaZaq_Du4IlX1Lqr-jp1uTgjypjHytrrlCRKJzDLgKeSIqsi1tNY1HHPlts2sMXghdybmdCvS44"
      },
      {
        id: "f1f1f1f1-e2e2-d3d3-c4c4-b5b5b5b5b5b5",
        name: "Sarah Jenkins",
        tier: "PRO",
        isVerified: true,
        rating: 5.0,
        reviewCount: 41,
        bio: "Calisthenics and HIIT specialist. Focused on helping you build extreme endurance, fat deficiting, and mastering calisthenic static holds (planche, front-lever). Let's unlock your physical peak.",
        gymLocation: "Celebrity Fitness, South",
        price: 150000,
        imgUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDDw_kLmb4W8Uppex06eBgtyRGCACFB8HxMLZVuHJYRINFfaDHBqz1lFP94sEInuyajXg1K7tzhMu_9vAV8T-MHuL48lziIuRqFkH23hcwAVgAoiexf2HokAyhyh4-MQ4YKnTyk1ECFLDmBGjEQfTCIjYx_EM_d0dTRiQFKMcqFYBkMzbxslqYdupVS25VRGY8ZMrrePfajPbPDOMVdzaWKf3S4s8hnFEENbg7YQDzZXOePza1GQLTnTFGAhyohXszMUP1_T7ZwLIg"
      }
    ]);
  };

  const getTierDetails = (tier: string) => {
    switch (tier) {
      case "PRO":
        return { label: "Pro Certified", class: "bg-pro-badge-bg text-pro-badge-text", price: 150000 };
      case "GOLD":
        return { label: "Gold Buddy", class: "bg-gold-badge-bg text-gold-badge-text", price: 75000 };
      default:
        return { label: "Silver Buddy", class: "bg-silver-badge-bg text-silver-badge-text", price: 50000 };
    }
  };

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(num);
  };

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleProcessPayment = () => {
    setPaymentMethodState("processing");
    setTimeout(() => {
      setPaymentMethodState("success");
      setTimeout(() => {
        setPaymentMethodState("idle");
        setView("dashboard");
      }, 1500);
    }, 2000);
  };

  const toggleDay = (day: string) => {
    setSelectedDays(prev => ({ ...prev, [day]: !prev[day] }));
  };

  const normalizedSearchQuery = searchQuery.toLowerCase();

  // Filter buddies based on searchQuery and activeFilter
  const filteredBuddies = buddies.filter(buddy => {
    const matchesSearch =
      (buddy.bio ?? "").toLowerCase().includes(normalizedSearchQuery) ||
      (buddy.gymLocation ?? "").toLowerCase().includes(normalizedSearchQuery) ||
      (buddy.name ?? "").toLowerCase().includes(normalizedSearchQuery);

    const matchesFilter = activeFilter === "All" || 
                          buddy.tier === activeFilter ||
                          (activeFilter === "Verified" && buddy.isVerified);

    return matchesSearch && matchesFilter;
  });

  const popularLocations = [
    { name: "Gold's Gym Mall Indonesia", address: "Kelapa Gading, Jakarta Utara" },
    { name: "Celebrity Fitness Kota Kasablanka", address: "Tebet, Jakarta Selatan" },
    { name: "Fitness First Grand Indonesia", address: "Menteng, Jakarta Pusat" }
  ];

  /* ==================== SCREEN 1: LANDING PAGE (Pelmatech-style marketing) ==================== */
  if (view === "splash") {
    return (
      <LandingPage
        onSelectSeeker={() => setView("signup")}
        onSelectBuddy={() =>
          alert("Buddy registration is currently offline. Please sign up as Seeker.")
        }
      />
    );
  }

  /* ==================== SCREEN 2: SIGN UP VIEW ==================== */
  if (view === "signup") {
    return (
      <div className="min-h-screen grid grid-cols-1 md:grid-cols-12 bg-bg-light">
        {/* Left Column — marketing (below form on phone) */}
        <div className="order-2 md:order-1 md:col-span-5 bg-tertiary text-white p-6 sm:p-8 md:p-12 flex flex-col justify-center items-start">
          <div className="flex items-center gap-2 mb-6 md:mb-8">
            <div className="bg-secondary-container p-2 rounded-lg text-white flex items-center">
              <span className="material-symbols-outlined text-[18px]">fitness_center</span>
            </div>
            <span className="font-extrabold text-[18px] tracking-tight">Trial<span className="text-secondary-container">Fit</span></span>
          </div>
          <h2 className="font-h1 text-[26px] sm:text-[32px] font-bold mb-4 max-w-sm leading-tight">Start Your Fitness Journey</h2>
          <p className="opacity-80 text-body mb-8 max-w-sm leading-relaxed">
            Create your account to match with professional fitness companions and coordinate local gym sessions automatically.
          </p>
          <div className="border border-white/20 rounded-xl p-4 text-[13px] text-accent-gold">
            Join 1,000+ fitness seekers already exercising together on TrialFit!
          </div>
        </div>

        {/* Right Column (Form) — first on phone for faster sign-up */}
        <div className="order-1 md:order-2 md:col-span-7 flex flex-col justify-center p-6 sm:p-8 md:p-16 text-left">
          <div className="max-w-md w-full mx-auto">
            <button 
              onClick={() => setView("splash")} 
              className="flex items-center gap-1.5 text-outline hover:text-on-surface text-[13px] mb-8 transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">arrow_back</span> Back to roles
            </button>

            <h2 className="font-h2 text-h2 text-on-background mb-1">Create your account</h2>
            <p className="text-outline text-small mb-8">Enter your details to register as a Gym Seeker.</p>

            <form onSubmit={(e) => { e.preventDefault(); setView("onboarding-goal"); }} className="grid gap-5">
              <div>
                <label className="block text-[11px] font-bold uppercase text-outline mb-1.5">Full Name</label>
                <input 
                  type="text" required value={signUpName} onChange={(e) => setSignUpName(e.target.value)} placeholder="Your full name"
                  className="w-full px-4 py-3 rounded-lg border border-border-light text-[14px] outline-none focus:border-primary transition-all"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-outline mb-1.5">Email Address</label>
                <input 
                  type="email" required value={signUpEmail} onChange={(e) => setSignUpEmail(e.target.value)} placeholder="email@example.com"
                  className="w-full px-4 py-3 rounded-lg border border-border-light text-[14px] outline-none focus:border-primary transition-all"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-outline mb-1.5">Phone Number</label>
                <div className="flex gap-2">
                  <div className="px-4 py-3 rounded-lg border border-border-light text-[14px] bg-surface-container-low text-on-surface font-semibold shrink-0">+62</div>
                  <input 
                    type="tel" required value={signUpPhone} onChange={(e) => setSignUpPhone(e.target.value)} placeholder="81234567890"
                    className="w-full px-4 py-3 rounded-lg border border-border-light text-[14px] outline-none focus:border-primary transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-outline mb-1.5">Password</label>
                <input 
                  type="password" required value={signUpPassword} onChange={(e) => setSignUpPassword(e.target.value)} placeholder="Minimum 8 characters"
                  className="w-full px-4 py-3 rounded-lg border border-border-light text-[14px] outline-none focus:border-primary transition-all"
                />
              </div>

              <button type="submit" className="w-full py-btn-v-padding bg-secondary-container text-white font-button text-button rounded-xl flex items-center justify-center gap-2 hover:brightness-110 shadow-lg active:scale-95 transition-all mt-4">
                Create Account <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  /* ==================== SCREEN 3: ONBOARDING STEP 1 GOAL VIEW ==================== */
  if (view === "onboarding-goal") {
    return (
      <div className="bg-bg-light min-h-screen flex flex-col font-body antialiased">
        <header className="app-onboarding-shell flex justify-between items-center py-4 shrink-0 z-10 relative">
          <button onClick={() => setView("signup")} className="w-10 h-10 flex items-center justify-center text-outline-variant hover:text-on-surface transition-colors">
            <span className="material-symbols-outlined text-[24px]">arrow_back</span>
          </button>
          <button onClick={() => setView("onboarding-location")} className="font-body text-body text-outline hover:text-on-surface transition-colors">
            Skip for now
          </button>
        </header>

        <main className="app-onboarding-shell flex-grow flex flex-col pb-24 md:pb-28">
          {/* Progress Indicator */}
          <div className="flex justify-center items-center gap-2 mb-8 mt-2">
            <div className="w-2.5 h-2.5 rounded-full bg-secondary-container"></div>
            <div className="w-2.5 h-2.5 rounded-full border border-border-light bg-surface-container-lowest"></div>
            <div className="w-2.5 h-2.5 rounded-full border border-border-light bg-surface-container-lowest"></div>
          </div>

          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-24 h-24 rounded-full bg-surface-container flex items-center justify-center mb-6 text-primary-container">
              <span className="material-symbols-outlined icon-fill text-[48px]">fitness_center</span>
            </div>
            <h1 className="font-h2 text-h2 text-on-background mb-2">What's your goal?</h1>
            <p className="font-body text-body text-outline">Pilih tujuan latihan kamu</p>
          </div>

          {/* Goal selection cards */}
          <div className="flex flex-col gap-4 flex-grow text-left">
            <div 
              onClick={() => setSelectedGoal("bulk")}
              className={`group flex items-center p-card-padding bg-surface-container-lowest rounded-[16px] cursor-pointer transition-all border-2 text-left ${selectedGoal === "bulk" ? "border-secondary-container shadow-md bg-secondary-container/5" : "border-border-light"}`}
            >
              <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-primary-container shrink-0 mr-4">
                <span className="material-symbols-outlined text-[24px]">sports_martial_arts</span>
              </div>
              <div className="flex-grow pr-4">
                <h3 className="font-body-bold text-body-bold text-on-background mb-1">Bulk (Massa Otot)</h3>
                <p className="font-small text-small text-outline">Membangun massa otot dan kekuatan</p>
              </div>
              <div className={`shrink-0 ${selectedGoal === "bulk" ? "text-secondary-container" : "text-outline-variant"}`}>
                <span className={`material-symbols-outlined text-[24px] ${selectedGoal === "bulk" ? "icon-fill" : ""}`}>
                  {selectedGoal === "bulk" ? "radio_button_checked" : "radio_button_unchecked"}
                </span>
              </div>
            </div>

            <div 
              onClick={() => setSelectedGoal("cut")}
              className={`group flex items-center p-card-padding bg-surface-container-lowest rounded-[16px] cursor-pointer transition-all border-2 text-left ${selectedGoal === "cut" ? "border-secondary-container shadow-md bg-secondary-container/5" : "border-border-light"}`}
            >
              <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-primary-container shrink-0 mr-4">
                <span className="material-symbols-outlined text-[24px]">scale</span>
              </div>
              <div className="flex-grow pr-4">
                <h3 className="font-body-bold text-body-bold text-on-background mb-1">Cut (Defisit Kalori)</h3>
                <p className="font-small text-small text-outline">Membakar lemak dan membentuk tubuh</p>
              </div>
              <div className={`shrink-0 ${selectedGoal === "cut" ? "text-secondary-container" : "text-outline-variant"}`}>
                <span className={`material-symbols-outlined text-[24px] ${selectedGoal === "cut" ? "icon-fill" : ""}`}>
                  {selectedGoal === "cut" ? "radio_button_checked" : "radio_button_unchecked"}
                </span>
              </div>
            </div>

            <div 
              onClick={() => setSelectedGoal("endurance")}
              className={`group flex items-center p-card-padding bg-surface-container-lowest rounded-[16px] cursor-pointer transition-all border-2 text-left ${selectedGoal === "endurance" ? "border-secondary-container shadow-md bg-secondary-container/5" : "border-border-light"}`}
            >
              <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-primary-container shrink-0 mr-4">
                <span className="material-symbols-outlined text-[24px]">monitor_heart</span>
              </div>
              <div className="flex-grow pr-4">
                <h3 className="font-body-bold text-body-bold text-on-background mb-1">Endurance (Daya Tahan)</h3>
                <p className="font-small text-small text-outline">Meningkatkan stamina dan kebugaran</p>
              </div>
              <div className={`shrink-0 ${selectedGoal === "endurance" ? "text-secondary-container" : "text-outline-variant"}`}>
                <span className={`material-symbols-outlined text-[24px] ${selectedGoal === "endurance" ? "icon-fill" : ""}`}>
                  {selectedGoal === "endurance" ? "radio_button_checked" : "radio_button_unchecked"}
                </span>
              </div>
            </div>
          </div>
        </main>

        <div className="app-sticky-footer">
          <div className="app-onboarding-shell">
            <button onClick={() => setView("onboarding-location")} className="w-full py-btn-v-padding bg-secondary-container text-on-primary font-button text-button rounded-xl flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_4px_12px_rgba(254,137,51,0.25)]">
              Lanjut <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ==================== SCREEN 3b: ONBOARDING STEP 2 LOCATION VIEW ==================== */
  if (view === "onboarding-location") {
    return (
      <div className="bg-bg-light min-h-screen flex flex-col font-body antialiased">
        <header className="app-onboarding-shell flex justify-between items-center py-4 shrink-0 z-10 relative">
          <button onClick={() => setView("onboarding-goal")} className="w-10 h-10 flex items-center justify-center text-outline-variant hover:text-on-surface transition-colors">
            <span className="material-symbols-outlined text-[24px]">arrow_back</span>
          </button>
          <button onClick={() => setView("onboarding-schedule")} className="font-body text-body text-outline hover:text-on-surface transition-colors">
            Skip for now
          </button>
        </header>

        <main className="app-onboarding-shell flex-grow flex flex-col pb-24 md:pb-28">
          {/* Progress Indicator */}
          <div className="flex justify-center items-center gap-2 mb-8 mt-2">
            <div className="w-2.5 h-2.5 rounded-full bg-success-green"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-secondary-container"></div>
            <div className="w-2.5 h-2.5 rounded-full border border-border-light bg-surface-container-lowest"></div>
          </div>

          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-24 h-24 rounded-full bg-surface-container flex items-center justify-center mb-6 text-primary-container">
              <span className="material-symbols-outlined icon-fill text-[48px] text-primary">location_on</span>
            </div>
            <h1 className="font-h2 text-h2 text-on-background mb-2">Where do you work out?</h1>
            <p className="font-body text-body text-outline">Cari lokasi gym favorit kamu</p>
          </div>

          {/* Location content matching 03b prompt */}
          <div className="flex flex-col gap-6 flex-grow text-left">
            
            {/* Search Input box */}
            <div className="relative bg-white rounded-lg border border-border-light shadow-sm">
              <span className="material-symbols-outlined text-outline absolute left-4 top-1/2 translate-y-[-50%] text-[20px]">search</span>
              <input 
                type="text"
                placeholder="Cari nama apartemen, kampus, atau gym..."
                value={searchLocation}
                onChange={(e) => {
                  setSearchLocation(e.target.value);
                  setIsTypingLocation(e.target.value.length > 0);
                  setSelectedLocation(null);
                }}
                className="w-full pl-12 pr-4 py-3.5 bg-transparent border-none outline-none text-sm placeholder-outline-variant"
              />
            </div>

            {/* Selected Location Card */}
            {selectedLocation && (
              <div className="bg-success-green/5 border border-success-green/30 p-4 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-success-green text-[20px] icon-fill">check_circle</span>
                  <div>
                    <h4 className="font-bold text-[14px] text-on-background">{selectedLocation}</h4>
                    <p className="text-xs text-outline">Selected favourite gym</p>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    setSelectedLocation(null);
                    setSearchLocation("");
                  }} 
                  className="text-primary text-xs font-semibold hover:underline"
                >
                  Change
                </button>
              </div>
            )}

            {/* Suggestions / Autocomplete Dropdown list */}
            {isTypingLocation && !selectedLocation && (
              <div className="bg-white border border-border-light rounded-xl shadow-md overflow-hidden">
                {popularLocations.filter(loc => (loc.name ?? "").toLowerCase().includes((searchLocation ?? "").toLowerCase())).map((loc) => (
                  <div 
                    key={loc.name}
                    onClick={() => {
                      setSelectedLocation(loc.name);
                      setSearchLocation(loc.name);
                      setIsTypingLocation(false);
                    }}
                    className="p-4 border-b border-border-light hover:bg-bg-light cursor-pointer flex gap-3"
                  >
                    <span className="material-symbols-outlined text-outline text-[18px]">location_on</span>
                    <div>
                      <h4 className="font-bold text-sm text-on-background">{loc.name}</h4>
                      <p className="text-xs text-outline">{loc.address}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Popular helper chips */}
            {!selectedLocation && !isTypingLocation && (
              <div>
                <span className="text-[11px] font-bold uppercase text-outline block mb-3">Popular category searches</span>
                <div className="flex flex-wrap gap-2">
                  {["Apartemen", "Kampus", "Kantor", "Lainnya"].map(chip => (
                    <button 
                      key={chip}
                      onClick={() => {
                        setSearchLocation(chip === "Apartemen" ? "Gold's Gym Mall Indonesia" : chip === "Kampus" ? "Fitness First Grand Indonesia" : "Celebrity Fitness Kota Kasablanka");
                        setIsTypingLocation(true);
                      }}
                      className="px-4 py-2 bg-silver-badge-bg hover:bg-surface-dim text-on-surface-variant font-small-bold rounded-full text-xs flex items-center gap-1.5 transition-colors"
                    >
                      <span className="material-symbols-outlined text-[14px]">
                        {chip === "Apartemen" ? "apartment" : chip === "Kampus" ? "school" : chip === "Kantor" ? "work" : "add"}
                      </span>
                      {chip}
                    </button>
                  ))}
                </div>
              </div>
            )}

          </div>
        </main>

        <div className="app-sticky-footer">
          <div className="app-onboarding-shell">
            <button onClick={() => setView("onboarding-schedule")} className="w-full py-btn-v-padding bg-secondary-container text-on-primary font-button text-button rounded-xl flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_4px_12px_rgba(254,137,51,0.25)]">
              Lanjut <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ==================== SCREEN 3c: ONBOARDING STEP 3 SCHEDULE VIEW ==================== */
  if (view === "onboarding-schedule") {
    return (
      <div className="bg-bg-light min-h-screen flex flex-col font-body antialiased">
        <header className="app-onboarding-shell flex justify-between items-center py-4 shrink-0 z-10 relative">
          <button onClick={() => setView("onboarding-location")} className="w-10 h-10 flex items-center justify-center text-outline-variant hover:text-on-surface transition-colors">
            <span className="material-symbols-outlined text-[24px]">arrow_back</span>
          </button>
          <span className="text-sm font-semibold text-outline">Last Step</span>
        </header>

        <main className="app-onboarding-shell flex-grow flex flex-col pb-24 md:pb-28">
          {/* Progress Indicator */}
          <div className="flex justify-center items-center gap-2 mb-8 mt-2">
            <div className="w-2.5 h-2.5 rounded-full bg-success-green"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-success-green"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-secondary-container"></div>
          </div>

          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-24 h-24 rounded-full bg-surface-container flex items-center justify-center mb-6 text-primary-container">
              <span className="material-symbols-outlined icon-fill text-[48px] text-primary">calendar_month</span>
            </div>
            <h1 className="font-h2 text-h2 text-on-background mb-2">Your Schedule</h1>
            <p className="font-body text-body text-outline">Kapan kamu biasanya workout?</p>
          </div>

          {/* Schedule picker stack matching 03c prompt */}
          <div className="flex flex-col gap-6 flex-grow text-left">
            
            {/* Day Chips multi-selection row */}
            <div>
              <span className="text-[11px] font-bold uppercase text-outline block mb-3">Pilih Hari</span>
              <div className="flex overflow-x-auto gap-2 pb-1 no-scrollbar">
                {["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"].map(day => {
                  const isSelected = !!selectedDays[day];
                  return (
                    <button 
                      key={day}
                      onClick={() => toggleDay(day)}
                      className={`flex-none px-4 py-2.5 rounded-full text-sm font-semibold transition-colors ${isSelected ? "bg-primary text-white shadow-sm" : "bg-silver-badge-bg text-on-surface-variant hover:bg-surface-dim"}`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time Toggle cards */}
            <div>
              <span className="text-[11px] font-bold uppercase text-outline block mb-3">Preferred Time</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                
                {/* Morning Card */}
                <div 
                  onClick={() => setSelectedTimeSlot("pagi")}
                  className={`border-2 p-4 bg-white rounded-xl cursor-pointer transition-all flex flex-col gap-2 items-center text-center ${selectedTimeSlot === "pagi" ? "border-secondary-container bg-secondary-container/5 shadow-sm" : "border-border-light"}`}
                >
                  <span className="material-symbols-outlined text-[24px] text-primary">light_mode</span>
                  <div>
                    <h4 className="font-bold text-sm">Pagi</h4>
                    <p className="text-[10px] text-outline">06:00 - 10:00</p>
                  </div>
                </div>

                {/* Afternoon Card */}
                <div 
                  onClick={() => setSelectedTimeSlot("siang")}
                  className={`border-2 p-4 bg-white rounded-xl cursor-pointer transition-all flex flex-col gap-2 items-center text-center ${selectedTimeSlot === "siang" ? "border-secondary-container bg-secondary-container/5 shadow-sm" : "border-border-light"}`}
                >
                  <span className="material-symbols-outlined text-[24px] text-primary">wb_sunny</span>
                  <div>
                    <h4 className="font-bold text-sm">Siang</h4>
                    <p className="text-[10px] text-outline">10:00 - 16:00</p>
                  </div>
                </div>

                {/* Evening Card */}
                <div 
                  onClick={() => setSelectedTimeSlot("sore")}
                  className={`border-2 p-4 bg-white rounded-xl cursor-pointer transition-all flex flex-col gap-2 items-center text-center ${selectedTimeSlot === "sore" ? "border-secondary-container bg-secondary-container/5 shadow-sm" : "border-border-light"}`}
                >
                  <span className="material-symbols-outlined text-[24px] text-primary">dark_mode</span>
                  <div>
                    <h4 className="font-bold text-sm">Sore</h4>
                    <p className="text-[10px] text-outline">16:00 - 21:00</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Selection Summary banner */}
            {(Object.values(selectedDays).some(Boolean) || selectedTimeSlot) && (
              <div className="bg-primary/5 border border-primary/20 p-4 rounded-xl flex items-center gap-3 text-primary text-sm font-semibold">
                <span className="material-symbols-outlined text-[20px]">calendar_month</span>
                <span>
                  {Object.keys(selectedDays).filter(d => selectedDays[d]).join(", ") || "Setiap Hari"} 
                  {selectedTimeSlot ? ` • ${selectedTimeSlot.toUpperCase()}` : ""}
                </span>
              </div>
            )}

          </div>
        </main>

        <div className="app-sticky-footer">
          <div className="app-onboarding-shell">
            <button onClick={() => setView("home-feed")} className="w-full py-btn-v-padding bg-secondary-container text-on-primary font-button text-button rounded-xl flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_4px_12px_rgba(254,137,51,0.25)]">
              Get Started <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ==================== SCREEN 4: HOME FEED VIEW ==================== */
  if (view === "home-feed") {
    return (
      <div className="bg-bg-light min-h-screen text-on-surface font-body pb-32">
        {/* Desktop Navbar Header */}
        <header className="bg-on-background w-full px-container-margin-desktop h-16 z-50 hidden md:flex justify-between items-center fixed top-0 left-0 shadow-sm pt-safe">
          <div className="font-h3 text-h3 font-bold text-on-primary tracking-tight">TrialFit</div>
          <div className="flex items-center gap-4 text-white">
            <button className="text-on-primary opacity-80 hover:opacity-100 transition-opacity active:scale-95 duration-150">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <div onClick={() => setView("dashboard")} className="w-8 h-8 rounded-full overflow-hidden bg-surface-dim border border-on-primary/20 cursor-pointer">
              <div className="w-full h-full bg-secondary-container text-white flex items-center justify-center font-bold text-sm">MC</div>
            </div>
          </div>
        </header>

        {/* Mobile Header */}
        <header className="bg-on-background w-full px-container-margin-mobile h-16 z-50 flex justify-between items-center fixed top-0 left-0 md:hidden shadow-sm pt-safe">
          <div className="font-h3 text-h3 font-bold text-on-primary">TrialFit</div>
          <button onClick={() => setView("dashboard")} className="text-on-primary opacity-80 hover:opacity-100 transition-opacity active:scale-95 duration-150">
            <span className="material-symbols-outlined">notifications</span>
          </button>
        </header>

        {/* Main Content Area */}
        <main className="pt-24 md:pt-[104px] px-container-margin-mobile md:px-container-margin-desktop max-w-7xl mx-auto">
          
          {/* Search section */}
          <section className="mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1 bg-surface-container-lowest rounded-lg border-[1.5px] border-border-light shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-input-h-padding flex items-center pointer-events-none text-outline">
                  <span className="material-symbols-outlined">search</span>
                </div>
                <input 
                  type="text" 
                  placeholder="Search by name, gym, specialty..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-[48px] pr-input-h-padding py-input-v-padding bg-transparent border-none focus:ring-0 text-body font-body text-on-surface placeholder-outline-variant outline-none rounded-lg animate-none"
                />
              </div>
              <button className="flex-none p-[14px] bg-surface-container-lowest border-[1.5px] border-border-light rounded-lg text-on-surface hover:bg-surface-dim transition-colors shadow-sm">
                <span className="material-symbols-outlined">tune</span>
              </button>
            </div>

            {/* Filter Chips */}
            <div className="flex overflow-x-auto no-scrollbar gap-3 pb-2 -mx-container-margin-mobile px-container-margin-mobile md:mx-0 md:px-0">
              {["All", "GOLD", "PRO", "SILVER", "Verified"].map((filter) => {
                const isActive = activeFilter === filter;
                return (
                  <button 
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`flex-none px-4 py-2 rounded-full font-small-bold whitespace-nowrap transition-colors ${isActive ? "bg-primary-container text-on-primary shadow-sm" : "bg-silver-badge-bg text-on-surface-variant hover:bg-surface-dim"}`}
                  >
                    {filter === "PRO" ? "Pro Tutors" : filter === "GOLD" ? "Gold Tutors" : filter}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Matched Feed Grid */}
          <section>
            <div className="flex items-baseline gap-3 mb-6">
              <h2 className="font-h2 text-h2 text-on-surface">Matched for You</h2>
              <span className="font-small text-small text-outline-variant">({filteredBuddies.length} buddies)</span>
            </div>

            {filteredBuddies.length === 0 ? (
              <div className="text-center py-16 bg-surface-container-lowest rounded-xl p-6 border border-border-light">
                <span className="material-symbols-outlined text-[48px] text-outline mb-4">search_off</span>
                <h3 className="font-bold text-lg mb-1">No buddies found</h3>
                <p className="text-outline text-sm">Try adjusting your filters or query</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-gutter">
                {filteredBuddies.map((buddy) => {
                  const isFav = !!favorites[buddy.id];

                  return (
                    <div 
                      key={buddy.id} 
                      onClick={() => {
                        setSelectedBuddy(buddy);
                        setView("buddy-profile");
                      }}
                      className="bg-surface-container-lowest rounded-xl shadow-[0_2px_8px_rgba(11,27,59,0.08)] overflow-hidden flex flex-col group hover:shadow-[0_4px_12px_rgba(11,27,59,0.12)] cursor-pointer transition-shadow duration-300"
                    >
                      <div className="relative w-full aspect-[4/3] bg-surface-dim overflow-hidden rounded-t-xl">
                        <img src={buddy.imgUrl} alt={buddy.name} className="w-full h-full object-cover" />
                        <div className="absolute top-3 left-3 flex gap-2">
                          <span className={`${buddy.tier === "PRO" ? "bg-pro-badge-bg text-pro-badge-text" : "bg-gold-badge-bg text-gold-badge-text"} px-2 py-1 rounded font-caption text-caption uppercase font-bold tracking-wide shadow-sm`}>
                            {buddy.tier}
                          </span>
                        </div>
                        <button 
                          onClick={(e) => toggleFavorite(buddy.id, e)}
                          className="absolute top-3 right-3 p-1.5 bg-surface-container-lowest/80 backdrop-blur-sm rounded-full text-outline-variant hover:text-error-red transition-colors shadow-sm"
                        >
                          <span className={`material-symbols-outlined text-[20px] ${isFav ? "text-error-red icon-fill" : ""}`}>favorite</span>
                        </button>
                      </div>

                      <div className="p-card-padding flex flex-col flex-grow text-left">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-body-bold text-body-bold text-on-surface truncate pr-2">{buddy.name}</h3>
                          <div className="flex items-center text-accent-gold gap-1 shrink-0">
                            <span className="material-symbols-outlined text-[16px] icon-fill">star</span>
                            <span className="font-small-bold text-small-bold text-on-surface-variant">{buddy.rating}</span>
                          </div>
                        </div>

                        <div className="flex items-center text-outline gap-1.5 mb-1">
                          <span className="material-symbols-outlined text-[16px]">location_on</span>
                          <span className="font-small text-small truncate">{buddy.gymLocation}</span>
                        </div>

                        <div className="font-small-bold text-small-bold text-on-surface mt-2 mb-4">
                          {formatRupiah(buddy.price)}<span className="font-small text-small text-outline font-normal">/session</span>
                        </div>

                        <button className="mt-auto w-full py-btn-v-padding px-btn-h-padding bg-secondary-container text-on-primary font-button text-button rounded-lg shadow-[0_4px_12px_rgba(254,137,51,0.25)] hover:bg-secondary-container/90 active:scale-95 transition-all duration-200">
                          Book
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </main>

        {/* Floating bottom navigation — phone & tablet only */}
        <nav className="app-bottom-nav md:hidden">
          <button onClick={() => setView("home-feed")} className="app-bottom-nav-item text-secondary-container">
            <span className="material-symbols-outlined text-[22px] icon-fill">home</span>
            <span className="text-[10px] font-semibold">Home</span>
          </button>
          <button onClick={() => setView("dashboard")} className="app-bottom-nav-item hover:text-white">
            <span className="material-symbols-outlined text-[22px]">event_available</span>
            <span className="text-[10px] font-semibold">Sessions</span>
          </button>
          <button onClick={() => setView("splash")} className="app-bottom-nav-item hover:text-white">
            <span className="material-symbols-outlined text-[22px]">logout</span>
            <span className="text-[10px] font-semibold">Logout</span>
          </button>
        </nav>
      </div>
    );
  }

  /* ==================== SCREEN 5: BUDDY PROFILE & SCHEDULE VIEW ==================== */
  if (view === "buddy-profile" && selectedBuddy !== null) {
    const details = getTierDetails(selectedBuddy.tier);

    return (
      <div className="bg-white min-h-screen text-on-surface font-body pb-32">
        {/* Desktop TopNavBar Header matching code.html */}
        <header className="hidden md:flex justify-between items-center w-full px-container-margin-desktop h-16 z-50 bg-on-background dark:bg-on-background text-on-primary font-h3 text-h3 docked full-width top-0 shadow-none sticky">
          <div className="font-h3 text-h3 font-bold text-on-primary tracking-tight">TrialFit</div>
          <div className="flex items-center gap-4 text-white">
            <button className="hover:opacity-100 transition-opacity opacity-80 active:scale-95 duration-150">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-sm">MC</div>
          </div>
        </header>

        <main className="max-w-[1200px] mx-auto pb-32 md:pb-16 text-left">
          
          {/* Cover Photo Banner */}
          <div className="w-full h-[200px] md:h-[300px] relative overflow-hidden bg-surface-container">
            <img src={selectedBuddy.imgUrl} alt="Professional gym environment" className="w-full h-full object-cover" />
            
            {/* Mobile Back Button overlay */}
            <button onClick={() => setView("home-feed")} className="md:hidden absolute top-4 left-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition-colors">
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
          </div>

          <div className="px-container-margin-mobile md:px-container-margin-desktop -mt-10 md:-mt-16 relative z-10 flex flex-col md:flex-row gap-gutter">
            
            {/* Left Column: Details */}
            <div className="w-full md:w-2/3 flex flex-col gap-8">
              
              {/* Profile Header */}
              <div className="flex flex-col gap-4">
                <div className="w-20 h-20 md:w-[100px] md:h-[100px] rounded-full border-4 border-white bg-surface-container overflow-hidden shadow-md">
                  <img src={selectedBuddy.imgUrl} alt={selectedBuddy.name} className="w-full h-full object-cover" />
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <h1 className="font-h1 text-[30px] font-bold text-primary leading-none">{selectedBuddy.name}</h1>
                    <div className="flex items-center gap-1 bg-surface-container-high px-3 py-1 rounded-full text-on-surface-variant font-small text-small shadow-sm md:hidden">
                      <span className="material-symbols-outlined text-[16px] text-secondary-container icon-fill">star</span>
                      <span className="font-small-bold">{selectedBuddy.rating}</span>
                      <span>({selectedBuddy.reviewCount})</span>
                    </div>
                  </div>

                  {/* Badges strip matching screen.png */}
                  <div className="flex flex-wrap gap-2 items-center">
                    <span className={`${details.class} font-caption text-caption uppercase px-2 py-1 rounded-sm tracking-wider shadow-sm flex items-center gap-1`}>
                      <span className="material-symbols-outlined text-[14px]">military_tech</span> {details.label}
                    </span>
                    <span className="bg-verified-badge-bg text-verified-badge-text font-caption text-caption uppercase px-2 py-1 rounded-sm tracking-wider shadow-sm flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">check_circle</span> Verified
                    </span>
                    <span className="bg-surface-variant text-on-surface-variant font-caption text-caption uppercase px-2 py-1 rounded-sm tracking-wider shadow-sm">
                      {selectedGoal === "bulk" ? "Strength" : selectedGoal === "cut" ? "Conditioning" : "Stamina"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Statistics info bar matching Google Stitch code.html exactly */}
              <div className="grid grid-cols-3 gap-4 bg-bg-light p-4 rounded-xl border border-border-light shadow-sm">
                <div className="flex flex-col items-center justify-center text-center">
                  <span className="font-h3 text-h3 font-bold text-primary">{selectedBuddy.reviewCount * 2}</span>
                  <span className="font-caption text-caption text-outline">Sessions</span>
                </div>
                <div className="flex flex-col items-center justify-center text-center border-l border-r border-border-light">
                  <span className="font-h3 text-h3 font-bold text-primary">98%</span>
                  <span className="font-caption text-caption text-outline">Response</span>
                </div>
                <div className="flex flex-col items-center justify-center text-center">
                  <span className="font-h3 text-h3 font-bold text-primary flex items-center gap-1">
                    {selectedBuddy.rating} <span className="material-symbols-outlined text-secondary-container text-[18px] icon-fill">star</span>
                  </span>
                  <span className="font-caption text-caption text-outline">Trust Score</span>
                </div>
              </div>

              {/* Bio & Specialties section */}
              <div className="flex flex-col gap-4">
                <h2 className="font-h3 text-h3 font-bold text-primary">About {selectedBuddy.name.split(" ")[0]}</h2>
                <p className="font-body text-body text-on-surface-variant leading-relaxed">
                  {selectedBuddy.bio}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {["Powerlifting", "Bodybuilding", "HIIT", "Nutrition"].map(tag => (
                    <span key={tag} className="bg-[#F1F5F9] text-[#475569] font-caption text-caption px-3 py-1.5 rounded-full border border-border-light shadow-sm text-xs font-semibold">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Testimonials section matching Google Stitch code.html exactly */}
              <div className="flex flex-col gap-4 mt-4">
                <div className="flex justify-between items-center">
                  <h2 className="font-h3 text-h3 font-bold text-primary">Reviews</h2>
                  <button onClick={() => alert("Reviews modal coming soon")} className="font-small-bold text-small-bold text-primary-container hover:underline">
                    See all
                  </button>
                </div>
                
                <div className="flex overflow-x-auto hide-scrollbar gap-4 pb-4 -mx-container-margin-mobile px-container-margin-mobile md:mx-0 md:px-0">
                  {/* Card 1 */}
                  <div className="min-w-[280px] bg-white rounded-card shadow-card p-card-padding border border-border-light flex flex-col gap-3 shrink-0">
                    <div className="flex items-center gap-0.5 text-secondary-container">
                      {[1,2,3,4,5].map(star => <span key={star} className="material-symbols-outlined text-[16px] icon-fill">star</span>)}
                    </div>
                    <p className="font-small text-small text-on-surface italic">"{selectedBuddy.name.split(" ")[0]} completely transformed my routine. Focus on technique is incredible."</p>
                    <span className="font-caption text-caption text-outline-variant font-medium mt-auto text-xs">- Sarah J.</span>
                  </div>
                  {/* Card 2 */}
                  <div className="min-w-[280px] bg-white rounded-card shadow-card p-card-padding border border-border-light flex flex-col gap-3 shrink-0">
                    <div className="flex items-center gap-0.5 text-secondary-container">
                      {[1,2,3,4,5].map(star => <span key={star} className="material-symbols-outlined text-[16px] icon-fill">star</span>)}
                    </div>
                    <p className="font-small text-small text-on-surface italic">"Best gym buddy I've found. Highly recommended! Very professional."</p>
                    <span className="font-caption text-caption text-outline-variant font-medium mt-auto text-xs">- David K.</span>
                  </div>
                </div>
              </div>

              {/* Response SLA list strip */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-bg-light border border-border-light rounded-xl p-4">
                <div>
                  <span className="text-[11px] uppercase text-outline block mb-1">Response Hours</span>
                  <span className="font-bold">&lt; 2 Hours</span>
                </div>
                <div>
                  <span className="text-[11px] uppercase text-outline block mb-1">Coaching Type</span>
                  <span className="font-bold">Offline Gym Only</span>
                </div>
                <div>
                  <span className="text-[11px] uppercase text-outline block mb-1">Gym Locations</span>
                  <span className="font-bold">Equinox, Fit, Celebrity</span>
                </div>
              </div>

            </div>

            {/* Right Column: Sticky Action Area inside a card on Desktop */}
            <div className="w-full md:w-1/3 md:pt-[100px] relative text-left">
              <div className="md:sticky md:top-24 flex flex-col gap-6 bg-white md:bg-bg-light md:p-6 md:rounded-card md:shadow-ambient md:border md:border-border-light">
                
                {/* Pricing Header (Desktop only inside card) */}
                <div className="hidden md:flex justify-between items-baseline mb-2">
                  <span className="font-h2 text-h2 text-primary font-bold">{formatRupiah(selectedBuddy.price)}<span className="font-small text-small text-outline font-normal">/session</span></span>
                  <button onClick={() => alert("Packages starting at 3 sessions")} className="font-small-bold text-small-bold text-primary-container hover:underline text-sm font-semibold">See packages</button>
                </div>

                {/* Schedule Selector Section matching code.html exactly */}
                <div className="flex flex-col gap-4">
                  <h3 className="font-h3 text-[16px] font-bold text-primary">Available Schedule</h3>
                  
                  {/* Mini Calendar strip */}
                  <div className="flex justify-between items-center bg-white p-2 rounded-xl border border-border-light shadow-sm">
                    {/* Mon 12 */}
                    <div 
                      onClick={() => { setSelectedCalendarDay(12); setBookingHours(1); }}
                      className={`flex flex-col items-center gap-1 p-2 rounded-lg cursor-pointer transition-colors ${selectedCalendarDay === 12 ? "bg-primary-container text-white shadow-md" : "hover:bg-surface-container"}`}
                    >
                      <span className={`font-caption text-caption text-[11px] ${selectedCalendarDay === 12 ? "text-white/80" : "text-outline"}`}>M</span>
                      <span className="font-small-bold text-small-bold text-sm">12</span>
                    </div>
                    {/* Tue 13 (Default Selected) */}
                    <div 
                      onClick={() => { setSelectedCalendarDay(13); setBookingHours(1); }}
                      className={`flex flex-col items-center gap-1 p-2 rounded-lg cursor-pointer transition-all ${selectedCalendarDay === 13 ? "bg-primary-container text-white shadow-md" : "hover:bg-surface-container"}`}
                    >
                      <span className={`font-caption text-caption text-[11px] ${selectedCalendarDay === 13 ? "text-white/80" : "text-outline"}`}>T</span>
                      <span className="font-small-bold text-small-bold text-sm">13</span>
                      {selectedCalendarDay !== 13 && <div className="w-1 h-1 rounded-full bg-secondary-container mt-0.5"></div>}
                    </div>
                    {/* Wed 14 */}
                    <div 
                      onClick={() => { setSelectedCalendarDay(14); setBookingHours(2); }}
                      className={`flex flex-col items-center gap-1 p-2 rounded-lg cursor-pointer transition-colors ${selectedCalendarDay === 14 ? "bg-primary-container text-white shadow-md" : "hover:bg-surface-container"}`}
                    >
                      <span className={`font-caption text-caption text-[11px] ${selectedCalendarDay === 14 ? "text-white/80" : "text-outline"}`}>W</span>
                      <span className="font-small-bold text-small-bold text-sm">14</span>
                    </div>
                    {/* Thu 15 */}
                    <div 
                      onClick={() => { setSelectedCalendarDay(15); setBookingHours(3); }}
                      className={`flex flex-col items-center gap-1 p-2 rounded-lg cursor-pointer transition-colors ${selectedCalendarDay === 15 ? "bg-primary-container text-white shadow-md" : "hover:bg-surface-container"}`}
                    >
                      <span className={`font-caption text-caption text-[11px] ${selectedCalendarDay === 15 ? "text-white/80" : "text-outline"}`}>T</span>
                      <span className="font-small-bold text-small-bold text-sm">15</span>
                    </div>
                    {/* Fri 16 */}
                    <div 
                      onClick={() => { setSelectedCalendarDay(16); setBookingHours(4); }}
                      className={`flex flex-col items-center gap-1 p-2 rounded-lg cursor-pointer transition-colors ${selectedCalendarDay === 16 ? "bg-primary-container text-white shadow-md" : "hover:bg-surface-container"}`}
                    >
                      <span className={`font-caption text-caption text-[11px] ${selectedCalendarDay === 16 ? "text-white/80" : "text-outline"}`}>F</span>
                      <span className="font-small-bold text-small-bold text-sm">16</span>
                    </div>
                    {/* Sat 17 (Disabled) */}
                    <div className="flex flex-col items-center gap-1 p-2 rounded-lg opacity-40">
                      <span className="font-caption text-caption text-[11px] text-outline">S</span>
                      <span className="font-small-bold text-small-bold text-sm">17</span>
                    </div>
                    {/* Sun 18 (Disabled) */}
                    <div className="flex flex-col items-center gap-1 p-2 rounded-lg opacity-40">
                      <span className="font-caption text-caption text-[11px] text-outline">S</span>
                      <span className="font-small-bold text-small-bold text-sm">18</span>
                    </div>
                  </div>

                  {/* Time Slots Selector Grid */}
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {["07:00 - 08:00", "09:00 - 10:00", "16:00 - 17:00", "18:00 - 19:00"].map(slot => {
                      const isSelected = selectedProfileHour === slot;
                      return (
                        <button 
                          key={slot}
                          onClick={() => setSelectedProfileHour(slot)}
                          className={`py-2 px-3 border-2 rounded-lg font-button text-xs transition-colors shadow-sm ${isSelected ? "border-primary-container text-primary bg-surface-container-low font-bold" : "border-border-light text-on-surface hover:border-primary-container bg-white"}`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Desktop Book Session Button inside card */}
                <button 
                  onClick={() => setView("payment")}
                  className="hidden md:flex w-full bg-[#FF8A34] text-white font-button text-button py-3.5 px-btn-h-padding rounded-lg justify-center items-center shadow-md hover:bg-secondary active:scale-95 transition-all mt-4 font-bold"
                >
                  Book Session ({bookingHours} Hr{bookingHours > 1 ? "s" : ""})
                </button>

              </div>
            </div>

          </div>
        </main>

        {/* Mobile Sticky Footer CTA matching Google Stitch exactly */}
        <div className="md:hidden fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-xl border-t border-border-light p-4 flex items-center justify-between z-40 pb-safe gap-3">
          <div className="flex min-w-0 flex-col text-left">
            <span className="font-small text-small text-[11px] text-outline">Price</span>
            <span className="font-h3 text-h3 text-primary font-bold text-lg">{formatRupiah(selectedBuddy.price)}</span>
          </div>
          <button 
            onClick={() => setView("payment")}
            className="shrink-0 bg-[#FF8A34] text-white font-button text-button py-3 px-6 sm:px-8 rounded-lg shadow-md active:scale-95 transition-transform font-bold text-sm min-h-[48px]"
          >
            Book Session
          </button>
        </div>

        {/* Desktop-only bottom nav — mobile uses sticky Book CTA above */}
        <nav className="app-bottom-nav hidden md:flex">
          <button onClick={() => setView("home-feed")} className="app-bottom-nav-item hover:text-white">
            <span className="material-symbols-outlined text-[22px]">home</span>
            <span className="text-[10px] font-semibold">Home</span>
          </button>
          <button onClick={() => setView("dashboard")} className="app-bottom-nav-item hover:text-white">
            <span className="material-symbols-outlined text-[22px]">event_available</span>
            <span className="text-[10px] font-semibold">Sessions</span>
          </button>
          <button onClick={() => setView("splash")} className="app-bottom-nav-item hover:text-white">
            <span className="material-symbols-outlined text-[22px]">logout</span>
            <span className="text-[10px] font-semibold">Logout</span>
          </button>
        </nav>
      </div>
    );
  }

  /* ==================== SCREEN 6: PAYMENT FLOW VIEW ==================== */
  if (view === "payment" && selectedBuddy) {
    const totalAmount = selectedBuddy.price * bookingHours;

    return (
      <div className="bg-bg-light min-h-screen text-on-surface font-body pb-32 flex flex-col text-left">
        
        {/* Processing Spinner Overlays */}
        {paymentState === "processing" && (
          <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-primary/95 backdrop-blur-sm">
            <div className="animate-spin border-4 border-white/30 border-t-white rounded-full w-12 h-12 mb-4"></div>
            <h2 className="font-h2 text-h2 text-on-primary font-bold">Processing payment...</h2>
            <p className="text-white/60 text-sm mt-1">Securing your escrow funds</p>
          </div>
        )}

        {paymentState === "success" && (
          <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white">
            <div className="w-20 h-20 bg-success-green/10 rounded-full flex items-center justify-center mb-6 text-success-green border border-success-green/20">
              <span className="material-symbols-outlined text-[48px] icon-fill">check_circle</span>
            </div>
            <h2 className="font-h2 text-h2 text-success-green font-bold mb-2">Payment Successful!</h2>
            <p className="text-outline text-sm">Your booking is secured in TrialFit Escrow.</p>
          </div>
        )}

        {/* Header */}
        <nav className="bg-primary shadow-md sticky top-0 z-50 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between w-full px-container-margin-mobile md:px-container-margin-desktop py-4 text-white pt-safe">
          <span className="font-h3 text-h3 font-extrabold tracking-tight shrink-0">Trial<span className="text-secondary-container">Fit</span></span>
          <div className="flex items-center gap-2 self-start sm:self-auto bg-white/10 px-3 py-1.5 rounded-full border border-white/20 backdrop-blur-sm max-w-full">
            <span className="material-symbols-outlined text-white text-[16px] icon-fill shrink-0">shield_lock</span>
            <span className="font-caption text-caption text-white truncate">Secured by Xendit</span>
          </div>
        </nav>

        {/* Content container */}
        <main className="flex-grow max-w-4xl mx-auto w-full px-container-margin-mobile md:px-container-margin-desktop py-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* Left side Payment options */}
            <div className="md:col-span-8 flex flex-col gap-6">
              <button onClick={() => setView("buddy-profile")} className="flex items-center gap-1.5 text-outline hover:text-on-surface text-[13px] self-start transition-colors">
                <span className="material-symbols-outlined text-[16px]">arrow_back</span> Back to schedule
              </button>

              <h2 className="font-h2 text-h2 text-on-surface">Choose Payment Method</h2>

              {/* Methods Stack */}
              <div className="flex flex-col gap-4">
                {/* BCA Option */}
                <div 
                  onClick={() => setPaymentMethod("bca")}
                  className={`flex items-center justify-between p-4 bg-white rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === "bca" ? "border-secondary-container bg-secondary-container/5 shadow-sm" : "border-border-light"}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-8 bg-primary/10 rounded flex items-center justify-center font-bold text-primary text-xs">BCA</div>
                    <div>
                      <h4 className="font-body-bold text-[15px]">BCA Virtual Account</h4>
                      <p className="text-[12px] text-outline">Automatic verification</p>
                    </div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === "bca" ? "border-secondary-container" : "border-outline-variant"}`}>
                    {paymentMethod === "bca" && <div className="w-2.5 h-2.5 bg-secondary-container rounded-full"></div>}
                  </div>
                </div>

                {/* Mandiri Option */}
                <div 
                  onClick={() => setPaymentMethod("mandiri")}
                  className={`flex items-center justify-between p-4 bg-white rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === "mandiri" ? "border-secondary-container bg-secondary-container/5 shadow-sm" : "border-border-light"}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-8 bg-primary/10 rounded flex items-center justify-center font-bold text-primary text-xs">MNDR</div>
                    <div>
                      <h4 className="font-body-bold text-[15px]">Mandiri Virtual Account</h4>
                      <p className="text-[12px] text-outline">Automatic verification</p>
                    </div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === "mandiri" ? "border-secondary-container" : "border-outline-variant"}`}>
                    {paymentMethod === "mandiri" && <div className="w-2.5 h-2.5 bg-secondary-container rounded-full"></div>}
                  </div>
                </div>

                {/* ShopeePay Option */}
                <div 
                  onClick={() => setPaymentMethod("shopeepay")}
                  className={`flex items-center justify-between p-4 bg-white rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === "shopeepay" ? "border-secondary-container bg-secondary-container/5 shadow-sm" : "border-border-light"}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-8 bg-secondary-container/10 rounded flex items-center justify-center font-bold text-secondary-container text-xs">SPay</div>
                    <div>
                      <h4 className="font-body-bold text-[15px]">ShopeePay / SPayLater</h4>
                      <p className="text-[12px] text-outline">Redirect checkout</p>
                    </div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === "shopeepay" ? "border-secondary-container" : "border-outline-variant"}`}>
                    {paymentMethod === "shopeepay" && <div className="w-2.5 h-2.5 bg-secondary-container rounded-full"></div>}
                  </div>
                </div>
              </div>
            </div>

            {/* Right side Summary Card */}
            <div className="md:col-span-4 mt-8 md:mt-16">
              <div className="bg-white rounded-2xl border border-border-light p-6 shadow-sm">
                <h3 className="font-body-bold text-on-surface mb-4">Summary details</h3>
                
                <div className="flex justify-between text-sm mb-3">
                  <span className="text-outline">Session Companion</span>
                  <span className="font-bold">{selectedBuddy.name}</span>
                </div>
                <div className="flex justify-between text-sm mb-3">
                  <span className="text-outline">Scheduled Slot</span>
                  <span className="font-bold">Juni {selectedCalendarDay} • {selectedProfileHour}</span>
                </div>
                <div className="flex justify-between text-sm mb-3">
                  <span className="text-outline">Duration</span>
                  <span className="font-bold">{bookingHours} Hour{bookingHours > 1 ? "s" : ""}</span>
                </div>
                <div className="flex justify-between text-sm mb-4 pb-4 border-b border-border-light">
                  <span className="text-outline">Rate per Hour</span>
                  <span className="font-bold">{formatRupiah(selectedBuddy.price)}</span>
                </div>

                <div className="flex justify-between items-baseline mb-6">
                  <span className="font-body-bold text-on-surface">Total Amount</span>
                  <span className="text-xl font-bold text-primary">{formatRupiah(totalAmount)}</span>
                </div>

                <button onClick={handleProcessPayment} className="w-full py-3.5 bg-secondary-container text-on-primary font-bold rounded-xl shadow-md hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">lock</span> Pay Now
                </button>
              </div>
            </div>

          </div>
        </main>
      </div>
    );
  }

  /* ==================== SCREEN 7: SEEKER DASHBOARD VIEW ==================== */
  if (view === "dashboard") {
    const dashboardBuddy = selectedBuddy ?? buddies[0] ?? null;

    return (
      <div className="bg-bg-light text-on-surface antialiased min-h-screen pb-24 md:pb-0 text-left">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-primary shadow-md pt-safe">
          <div className="flex justify-between items-center w-full px-container-margin-mobile md:px-container-margin-desktop py-4 max-w-[1440px] mx-auto text-white">
            <div className="flex items-center gap-4">
              <h1 className="font-h2 text-h2 font-extrabold tracking-tight">TrialFit</h1>
            </div>
            <div className="flex items-center gap-6">
              <div className="hidden md:block text-right">
                <p className="font-body-bold text-body-bold text-white font-bold">Hello, {signUpName || "Alex"}!</p>
                <p className="font-small text-small text-white/80">Ready to crush it?</p>
              </div>
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuApKFAH7YXimJLl64HalSnwW9EhFM3oEOnElRMaIDu4J52wp41G-iqa2q4dAkYhD_TFIL-4Jzt2NBkkqSyZT0qM1LLuI3BFSVzEHC17KoNw37_fow6HXg6plxXPiUQDLj8ODUELFLFobFrY81WZ5IyTzgxduJO-Mw9ZEIM6JfGQE1BJJMbKX5grPoOL_Bk2OkPddoxwhsNpwuRl8Y0ShcOai0gMR-ldlSXY-fN4j4c_5-f_xt3puW_zBa1bu2Ykora8YNlxrV9Maoc" 
                alt="Avatar" className="w-10 h-10 rounded-full border-2 border-border-light object-cover" 
              />
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="pt-24 md:pt-32 px-container-margin-mobile md:px-container-margin-desktop max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
            
            {/* Main column */}
            <div className="md:col-span-8 flex flex-col gap-8">
              
              {/* Summary statistics grid */}
              <section>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-surface-container-lowest rounded-xl p-card-padding shadow-sm flex flex-col gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary-container">
                      <span className="material-symbols-outlined">calendar_month</span>
                    </div>
                    <div>
                      <p className="font-h2 text-h2 text-on-surface font-extrabold">13</p>
                      <p className="font-small text-small text-outline">Total Sessions</p>
                    </div>
                  </div>

                  <div className="bg-surface-container-lowest rounded-xl p-card-padding shadow-sm flex flex-col gap-3">
                    <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined">track_changes</span>
                    </div>
                    <div>
                      <p className="font-h3 text-h3 text-on-surface font-extrabold">Bulk</p>
                      <p className="font-small text-small text-outline">Target Goal</p>
                    </div>
                  </div>

                  <div className="bg-surface-container-lowest rounded-xl p-card-padding shadow-sm flex flex-col gap-3">
                    <div className="w-10 h-10 rounded-full bg-success-green/10 flex items-center justify-center text-success-green">
                      <span className="material-symbols-outlined">payments</span>
                    </div>
                    <div>
                      <p className="font-h3 text-h3 text-on-surface font-extrabold">{formatRupiah((dashboardBuddy?.price ?? 0) * bookingHours)}</p>
                      <p className="font-small text-small text-outline">Escrow Held</p>
                    </div>
                  </div>

                  <div className="bg-surface-container-lowest rounded-xl p-card-padding shadow-sm flex flex-col gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent-gold/10 flex items-center justify-center text-accent-gold">
                      <span className="material-symbols-outlined icon-fill">military_tech</span>
                    </div>
                    <div>
                      <p className="font-h3 text-h3 text-on-surface font-extrabold">Active</p>
                      <p className="font-small text-small text-outline">Account Status</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Active Bookings schedule list */}
              <section className="bg-surface-container-lowest border border-border-light rounded-2xl p-6 shadow-sm">
                <h3 className="font-h3 text-[18px] font-bold text-on-surface mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary-container">event_available</span> Active Sessions Scheduled
                </h3>

                {dashboardBuddy ? (
                <div className="flex items-center gap-4 p-4 border border-border-light rounded-xl hover:bg-bg-light transition-colors">
                  <img src={dashboardBuddy.imgUrl} alt={dashboardBuddy.name} className="w-12 h-12 rounded-full object-cover shrink-0" />
                  <div className="flex-grow min-w-0 text-left">
                    <h4 className="font-bold text-[15px] truncate">{dashboardBuddy.name}</h4>
                    <p className="text-[12px] text-outline flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px] shrink-0">location_on</span>
                      <span className="truncate">{dashboardBuddy.gymLocation}</span>
                    </p>
                    <p className="text-[11px] text-outline font-semibold mt-1">
                      Scheduled Slot: Juni {selectedCalendarDay} • {selectedProfileHour}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="px-3 py-1 bg-verified-badge-bg text-verified-badge-text text-[11px] font-bold rounded-full block text-center mb-1">
                      Paid Escrow
                    </span>
                    <span className="text-[12px] text-outline block">{bookingHours} Hour{bookingHours > 1 ? "s" : ""}</span>
                  </div>
                </div>
                ) : (
                  <p className="text-sm text-outline">No active sessions yet. Browse buddies on Home to book your first session.</p>
                )}
              </section>

            </div>

            {/* Right sidebar */}
            <div className="md:col-span-4 flex flex-col gap-6 text-left">
              <div className="bg-surface-container-lowest border border-border-light rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-[16px] mb-4">Training Progress</h3>
                
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-outline mb-1.5">
                    <span>Muscle Volume Scaling</span>
                    <span className="font-bold text-primary">80% Completed</span>
                  </div>
                  <div className="w-full bg-bg-light h-2 rounded-full overflow-hidden">
                    <div className="bg-primary h-full rounded-full" style={{ width: "80%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-outline mb-1.5">
                    <span>Stamina Scaling</span>
                    <span className="font-bold text-secondary-container">55% Completed</span>
                  </div>
                  <div className="w-full bg-bg-light h-2 rounded-full overflow-hidden">
                    <div className="bg-secondary-container h-full rounded-full" style={{ width: "55%" }}></div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </main>

        <nav className="app-bottom-nav md:hidden">
          <button onClick={() => setView("home-feed")} className="app-bottom-nav-item hover:text-white">
            <span className="material-symbols-outlined text-[22px]">home</span>
            <span className="text-[10px] font-semibold">Home</span>
          </button>
          <button onClick={() => setView("dashboard")} className="app-bottom-nav-item text-secondary-container">
            <span className="material-symbols-outlined text-[22px] icon-fill">event_available</span>
            <span className="text-[10px] font-semibold">Sessions</span>
          </button>
          <button onClick={() => setView("splash")} className="app-bottom-nav-item hover:text-white">
            <span className="material-symbols-outlined text-[22px]">logout</span>
            <span className="text-[10px] font-semibold">Logout</span>
          </button>
        </nav>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-6" style={{ color: "#0B1B3B" }}>
      <p className="font-body text-body">Unknown screen. Returning to splash…</p>
    </div>
  );
}
