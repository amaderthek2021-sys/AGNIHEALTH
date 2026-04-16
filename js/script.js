document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Sticky Header
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '5px 0';
            header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.padding = '10px 0';
            header.style.boxShadow = '0 2px 15px rgba(0,0,0,0.05)';
        }
    });

    // 2. Scroll Reveal Animations
    const revealElements = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    // 3. Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80; 
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // 4. Reviews Slider Controls
    const prevBtn = document.getElementById('prevReview');
    const nextBtn = document.getElementById('nextReview');
    const reviewTrack = document.getElementById('reviewTrack');

    if(prevBtn && nextBtn && reviewTrack) {
        const scrollAmount = 382; // Card width approx 350px + 32px gap
        
        prevBtn.addEventListener('click', () => {
            reviewTrack.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });

        nextBtn.addEventListener('click', () => {
            reviewTrack.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
    }

    // 5. Doctors Tab Logic
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            btn.classList.add('active');
            document.getElementById(btn.getAttribute('data-tab')).classList.add('active');
        });
    });

    // 6. Theme Toggle Logic
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        });
    }

    // 7. Language Toggle Logic (BN/EN)
    const langToggle = document.getElementById('langToggle');
    let isBengali = false;

    const bnDict = {
        "Home": "হোম",
        "About Us": "আমাদের সম্পর্কে",
        "About Agni Healthcare": "অগ্নি হেলথকেয়ার সম্পর্কে",
        "Services": "পরিষেবা",
        "Doctors": "চিকিৎসক",
        "Reviews": "মতামত",
        "Contact": "যোগাযোগ",
        "Call Now": "কল করুন",
        "31 Bed Multi-Speciality Nursing Home": "৩১ শয্যা বিশিষ্ট মাল্টি-স্পেশালিটি নার্সিংহোম",
        "Book Appointment": "অ্যাপয়েন্টমেন্ট বুক করুন",
        "Always by Your Side": "আপনার পাশে সবসময়",
        "Leadership & Trust": "নেতৃত্ব এবং বিশ্বাস",
        "Co-Founder": "সহ-প্রতিষ্ঠাতা",
        "Owner": "মালিক",
        "Our Premium Services": "আমাদের প্রিমিয়াম পরিষেবা",
        "Intensive Care Unit": "নিবিড় পরিচর্যা কেন্দ্র",
        "General & Laparoscopic Surgery": "জেনারেল ও ল্যাপারোস্কোপিক সার্জারি",
        "Gynecology & Obstetrics (স্ত্রী ও প্রসূতি রোগ বিশেষজ্ঞ)": "স্ত্রী ও প্রসূতি বিভাগ",
        "Gynecology & Obstetrics": "স্ত্রী ও প্রসূতি বিভাগ",
        "General Medicine (জেনারেল মেডিসিন)": "সাধারণ ঔষধ বিভাগ (জেনারেল মেডিসিন)",
        "General Medicine": "সাধারণ ঔষধ বিভাগ",
        "Dermatology (চর্মরোগ বিশেষজ্ঞ)": "চর্মরোগ বিভাগ",
        "Dermatology": "চর্মরোগ বিভাগ",
        "General & Laparoscopy Surgeon": "জেনারেল ও ল্যাপারোস্কোপিক সার্জন",
        "Orthopedic Surgeon (অস্থি বিশেষজ্ঞ)": "অস্থি শল্যচিকিৎসক",
        "Orthopedic Surgeon": "অস্থি শল্যচিকিৎসক",
        "Pediatrics (শিশু রোগ বিশেষজ্ঞ)": "শিশুরোগ বিভাগ",
        "Pediatrics": "শিশুরোগ বিভাগ",
        "Paediatric & Paediatric Surgery": "শিশুরোগ ও শিশু শল্যচিকিৎসা",
        "Specialized Departments": "বিশেষজ্ঞ বিভাগ",
        "Other Specialties & Anesthesia": "অন্যান্য বৈশিষ্ট্য এবং অ্যানেস্থেসিয়া",
        "Cardiology": "কার্ডিওলজি",
        "Orthopaedic": "অস্থি রোগ",
        "Urology": "ইউরোলজি",
        "Chest Medicine": "বক্ষব্যাধি",
        "Neurology": "স্নায়ুরোগ",
        "Psychiatry": "মনোরোগ বিভাগ",
        "Psychiatrist": "মনোরোগ বিশেষজ্ঞ",
        "ENT": "নাক কান গলা",
        "Anesthesiology": "অ্যানেস্থেসিওলজি",
        "Medicine": "মেডিসিন",
        "Gynae & Obstetric": "স্ত্রী ও প্রসূতি রোগ",
        "Clinical Assistant – On Duty": "ক্লিনিক্যাল অ্যাসিস্ট্যান্ট – অন ডিউটি",
        "Department of Physiotherapy": "ফিজিওথেরাপি বিভাগ",
        "Qualifications": "যোগ্যতা",
        "Role: Specialist in Breast Surgery": "ভূমিকা: ব্রেস্ট সার্জারি বিশেষজ্ঞ",
        "Role: Skin & Cosmetic Dermatology Consultant": "ভূমিকা: ত্বক ও কসমেটিক ডার্মাটোলজি কনসালট্যান্ট",
        "Cardiac Care": "হার্টের চিকিৎসা",
        "Laboratory (24 hrs)": "ল্যাবরেটরি (২৪ ঘণ্টা)",
        "OPD Services": "বহির্বিভাগ পরিষেবা (ওপিডি)",
        "Our Dedicated Doctors": "আমাদের বিশেষজ্ঞ চিকিৎসক",
        "Expert medical professionals at your service": "আপনার সেবায় দক্ষ চিকিৎসকমণ্ডলী",
        "OPD Department": "বহির্বিভাগ (OPD)",
        "IPD Department": "উপরিবিভাগ (IPD)",
        "Patient Stories": "রোগীদের অভিজ্ঞতা",
        "Get In Touch": "যোগাযোগ করুন",
        "Location": "ঠিকানা",
        "24/7 Helpline": "২৪/৭ হেল্পলাইন",
        "Send Request": "আবেদন পাঠান",
        "Full Name": "সম্পূর্ণ নাম",
        "Phone Number": "ফোন নম্বর"
    };

    const revDict = Object.fromEntries(Object.entries(bnDict).map(([k, v]) => [v, k]));

    if (langToggle) {
        langToggle.addEventListener('click', () => {
            isBengali = !isBengali;
            langToggle.innerText = isBengali ? 'EN' : 'BN';
            
            let dictionary = isBengali ? bnDict : revDict;
            // Sort keys by length descending to match longest phrases first
            let keys = Object.keys(dictionary).sort((a,b) => b.length - a.length);
            
            function walk(node) {
                if (node.nodeType === 3) {
                    let val = node.nodeValue;
                    if(val.trim() === '') return;
                    let original = val;
                    keys.forEach(k => {
                        if(val.includes(k)) {
                            val = val.split(k).join(dictionary[k]);
                        }
                    });
                    if(original !== val) node.nodeValue = val;
                } else if (node.nodeType === 1 && node.tagName !== 'SCRIPT' && node.tagName !== 'STYLE') {
                    node.childNodes.forEach(walk);
                    if(node.placeholder) {
                        let p = node.placeholder;
                        keys.forEach(k => {
                            if(p.includes(k)) p = p.split(k).join(dictionary[k]);
                        });
                        node.placeholder = p;
                    }
                }
            }
            walk(document.body);
        });
    }
});
