// Sample content. Shown only when no Sanity Project ID is set (for testing the design).
// Once Sanity is connected, everything comes from the admin panel instead.
export const fallback = {
  site: {
    name: "Royal Hospital",
    tagline: "Ekarool, Unnikulam",
    landline: "0495 2656501",
    mobile: "95266 46501",
    whatsapp: "919526646501",
    address: "Ekarool, Unnikulam",
    mapLink: "#",
    hero: {
      title: "Caring for you, close to home.",
      text: "Consultation, diagnostics and treatment under one roof in Unnikulam. Check department timings, then book your visit.",
      image: null,
    },
    deptIntro: "Everything you need in one place.",
    services: [
      {
        icon: "steth",
        name: "OP",
        text: "Meet our doctors for consultation, check-ups and follow-up visits. Pick a department and a time that suits you, and we will confirm your booking.",
        link: { label: "See consultation timings", href: "/#timings" },
      },
      {
        icon: "flask",
        name: "Laboratory",
        text: "Blood tests and other diagnostic tests, with clear and reliable reports that you and your doctor can act on.",
        link: null,
      },
      {
        icon: "pulse",
        name: "Emergency care",
        text: "First-line care for sudden illness and injury. If someone needs urgent help, call the hospital right away.",
        link: { label: "Call 0495 2656501", href: "tel:04952656501" },
      },
      {
        icon: "pill",
        name: "Pharmacy",
        text: "Prescribed medicines available inside the hospital, so you can collect them right after your consultation.",
        link: null,
      },
    ],
    about: {
      title: "About Royal Hospital",
      text: "Royal Hospital serves families in and around Unnikulam with dependable, patient-first care. Replace this with the hospital's own story: when it started, what it offers and what patients can expect.",
      image: null,
    },
    contact: [
      ["Address", "Royal Hospital, Ekarool, Unnikulam"],
      ["Phone", "0495 2656501"],
      ["Mobile and WhatsApp", "95266 46501"],
      ["Hours", "Add OPD and emergency hours here"],
    ],
    mapImage: null,
    footer: "Royal Hospital, Ekarool, Unnikulam",
  },
  timings: [
    {
      name: "Orthopaedics",
      consultant: "Orthopaedic Specialist",
      days: [
        ["Monday", ["4:30 pm to 5:30 pm"]],
        ["Tuesday", ["2:30 pm to 3:30 pm", "5:00 pm to 6:00 pm"]],
        ["Wednesday", ["2:00 pm to 3:00 pm"]],
        ["Friday", ["5:00 pm to 6:30 pm"]],
        ["Saturday", ["9:30 am to 10:30 am", "5:00 pm to 6:00 pm"]],
      ],
    },
    { name: "General medicine", consultant: "General Physician", days: [] },
  ],
  doctors: [
    { id: "doctor-1", name: "Doctor name", role: "Orthopaedic Surgeon", dept: "Orthopaedics", image: null },
    { id: "doctor-2", name: "Doctor name", role: "General Physician", dept: "General medicine", image: null },
  ],
};
