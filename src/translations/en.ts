export const en = {
  // App
  appName: 'QCare Kerala',
  tagline: 'Kerala Government Digital Healthcare Access',
  deptHeader: 'Health & Family Welfare Department, Government of Kerala',
  
  // Navigation
  nav: {
    home: 'Home',
    opBooking: 'OP Booking',
    myOp: 'My OP',
    liveQueue: 'Live Queue',
    medicines: 'Medicines',
    bloodBank: 'Blood Bank',
    reports: 'Reports',
    hospitals: 'Hospitals',
    wallet: 'Wallet',
    profile: 'Profile',
    notifications: 'Notifications',
    more: 'More',
  },

  // Home
  home: {
    greetingMorning: 'Good morning',
    greetingAfternoon: 'Good afternoon',
    greetingEvening: 'Good evening',
    uhidLabel: 'UHID',
    quickActions: 'Quick Healthcare Services',
    noActiveBooking: 'No Active OP Booking',
    noActiveDesc: 'Book an outpatient ticket for government hospitals across Kerala.',
    bookOpButton: 'Book an OP Ticket',
    currentOpTitle: 'Current OP Status',
    nextOpTitle: 'Your Next OP Appointment',
    tokenLabel: 'Token Number',
    nowServing: 'Now Serving',
    estimatedWait: 'Estimated Wait',
    viewQueueBtn: 'View Live Queue',
    smartInsights: 'Smart Health Updates',
  },

  // OP Booking
  booking: {
    title: 'Outpatient (OP) Booking',
    subtitle: 'Government Hospitals in Kerala · Token Fee ₹2.00',
    step1: 'Patient',
    step2: 'Visit Type',
    step3: 'Hospital',
    step4: 'Department',
    step5: 'Queue Info',
    step6: 'Doctor',
    step7: 'Time Slot',
    step8: 'Summary & Pay',
    
    patientMyself: 'Myself',
    familyMember: 'Family Member',
    addFamilyBtn: '+ Add Family Member',
    
    visitNew: 'New Visit',
    visitFollowup: 'Follow-up Visit',
    selectPastAppointment: 'Select Previous Visit for Follow-up',
    
    cutoffNoticeTitle: 'Online OP Booking Closed for Today (9:00 AM Cutoff)',
    cutoffNoticeMsg: 'Online OP token booking for today closes at 9:00 AM IST. Offline OP registration is currently open at the hospital counter. You may still book OP tokens for tomorrow or view live queue updates.',
    
    smartHospitalSuggestionTitle: 'AI Smart Load Balancing Suggestion',
    smartHospitalSuggestionMsg: 'High queue load detected at selected hospital. A nearby facility offers significantly reduced wait times.',
    chooseSuggested: 'Choose Suggested Hospital',
    continueSelected: 'Continue With Selected Hospital',

    doctorRecommended: 'Recommended Doctor',
    doctorReasonLoad: 'Lower scheduled appointment load and earlier open slot',
    
    timeSlotClosed: 'Closed',
    timeSlotBooked: 'Booked',
    
    feeLabel: 'OP Token Registration Fee',
    paymentMethod: 'Choose Payment Method',
    payUpi: 'UPI Payment (GPay / PhonePe / Paytm)',
    payWallet: 'QCare Health Balance (Prepaid)',
    currentWalletBal: 'Available QCare Balance',
    addMoney: 'Recharge Wallet',
    insufficientBal: 'Insufficient QCare Health Balance. Please recharge or use UPI.',
    payAndBookBtn: 'Pay ₹2.00 & Confirm Booking',
    processingPayment: 'Securing OP Token & Processing Payment...',
    
    successTitle: 'OP Token Confirmed!',
    bookingRef: 'Booking Reference',
    downloadTicket: 'Download Digital Ticket',
  },

  // Live Queue
  queue: {
    title: 'Realtime OP Live Queue',
    nowServingToken: 'Now Serving Token',
    yourToken: 'Your Token Number',
    peopleAhead: 'Patients Ahead of You',
    estimatedWait: 'Estimated Waiting Time',
    queueProgress: 'Queue Progress',
    soundNotificationOn: 'Audio Queue Callouts Enabled',
    statusWaiting: 'Waiting in Hall',
    statusCalled: 'Token Called - Proceed to Room',
    statusConsultation: 'In Doctor Consultation',
    statusCompleted: 'Consultation Completed',
  },

  // Medicines
  medicines: {
    title: 'Hospital Pharmacy & Nearby Availability',
    rxHeader: 'Prescribed Medicines from Latest Visit',
    searchPlaceholder: 'Search by brand name or generic medicine (e.g., Paracetamol)...',
    availHospital: 'Available at Hospital Pharmacy',
    unavailHospital: 'Out of Stock at Hospital Pharmacy',
    nearbyPharmaciesTitle: 'Nearby Authorized Pharmacies',
    freshnessLabel: 'Last updated stock status',
    kmAway: 'km away',
  },

  // Blood Bank
  blood: {
    title: 'Kerala Blood Bank Inventory & Alerts',
    selectGroup: 'Select Required Blood Group',
    findNearby: 'Search Nearby Stock',
    unitsAvailable: 'Units Available',
    lastUpdated: 'Updated',
    createAlertTitle: 'Create Blood Availability Alert',
    alertRadius: 'Search Radius (km)',
    subscribeAlertBtn: 'Subscribe to Realtime Alert',
  },

  // Reports
  reports: {
    title: 'Digital Health Records & Reports',
    downloadPdf: 'Download Document',
    viewReport: 'View Report',
    noReports: 'No digital health reports found for this profile.',
  },

  // Wallet
  wallet: {
    title: 'QCare Health Balance',
    subtitle: 'Prepaid digital healthcare wallet for zero-delay token payments',
    currentBalance: 'Current Balance',
    addFunds: 'Recharge Balance',
    recentTransactions: 'Transaction History',
    rechargeSuccess: 'Recharge Successful',
  },

  // Common
  common: {
    loading: 'Connecting to QCare Kerala servers...',
    error: 'An unexpected error occurred. Please try again.',
    close: 'Close',
    back: 'Back',
    next: 'Next',
    save: 'Save Changes',
    cancel: 'Cancel',
    success: 'Action completed successfully',
    male: 'Male',
    female: 'Female',
    other: 'Other',
    district: 'District',
  }
};
