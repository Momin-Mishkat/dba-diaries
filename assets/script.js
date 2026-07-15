
  const lines = [
    {ts:"2026-07-14 06:02:11", lvl:"info", text:"Instance identity: Momin Mishkat, Oracle DBA"},
    {ts:"2026-07-14 06:02:12", lvl:"info", text:"Session started: coffee.status = BREWING"},
    {ts:"2026-07-14 06:02:14", lvl:"warn", text:"New post available: see index below"},
    {ts:"2026-07-14 06:02:15", lvl:"info", text:"Welcome. Scroll to read."}
  ];

  const box = document.getElementById('logbox');
  let li = 0;

  if (box) {

  function typeLine(line, cb){
    const div = document.createElement('div');
    const ts = document.createElement('span');
    ts.className = 'ts';
    ts.textContent = '[' + line.ts + '] ';
    const lvl = document.createElement('span');
    lvl.className = 'lvl-' + line.lvl;
    div.appendChild(ts);
    div.appendChild(lvl);
    box.appendChild(div);

    let i = 0;
    const speed = 14;
    function step(){
      if(i <= line.text.length){
        lvl.textContent = line.text.slice(0, i);
        i++;
        setTimeout(step, speed);
      } else {
        cb();
      }
    }
    step();
  }

  function runNext(){
    if(li < lines.length){
      typeLine(lines[li], () => { li++; setTimeout(runNext, 220); });
    } else {
      const cur = document.createElement('span');
      cur.className = 'cursor';
      box.appendChild(cur);
    }
  }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    lines.forEach(l => {
      const div = document.createElement('div');
      div.innerHTML = '<span class="ts">[' + l.ts + '] </span><span class="lvl-' + l.lvl + '">' + l.text + '</span>';
      box.appendChild(div);
    });
  } else {
    runNext();
  }
  }

  // ---------- LANGUAGE TOGGLE ----------
  const hinglish = {
    "nav-about": "Mere Baare Mein",
    "nav-home": "Home",
    "nav-activity": "Activity",
    "nav-scenario": "Scenario",
    "nav-blog": "Blog",
    "nav-architecture": "Architecture",
    "t-tech-label": "Tech ke hisaab se filter karo:",
    "t-desc-activity": "Daily routines, checklists, aur wo chhoti-chhoti habits jo bade incidents banne se pehle hi problems pakad leti hain.",
    "t-desc-scenario": "Real production incidents, decision-by-decision walkthrough ke saath — sanitized version nahi.",
    "t-desc-blog": "Opinions, explainers, aur general likhawat Oracle, OCI, aur PostgreSQL ke across.",
    "t-soon-blog": "Naye posts jald aa rahe hain.",
    "t-desc-arch": "System design, high-availability topology, aur cloud architecture ke notes.",
    "t-soon-arch": "Naye posts jald aa rahe hain.",
    "t-hero-h1": 'DBA Diaries mein <em>swagat hai.</em>',
    "t-hero-tag": "Ek working Oracle DBA ke field notes — tuning, backups, raat ke 3 baje ke pages, aur wo sab kuch jo documentation mein kabhi nahi likha jaata.",
    "t-about": 'Mai Momin Mishkat hu. Meri poori career databases ko upright rakhne mein gayi hai — wait events ke peeche bhaagna, RMAN jobs ko babysit karna, aur application team ko samjhaana ki "kal to sahi tha" koi root cause nahi hota. Yahan wahi likhta hu jo main actually karta hu, sanitized version nahi. Har hafte ek naya post, zyadatar Oracle par, kabhi-kabhi production support ki general afra-tafri par bhi.',
    "t-index-read": "7 min ka read",
    "t-index-title": "Oracle DBA ka Daily Checklist: Coffee thandi hone se pehle jo 10 cheezein main check karta hu",
    "t-art-read": "7 min ka read",
    "t-art-title": "Oracle DBA ka Daily Checklist: Coffee thandi hone se pehle jo 10 cheezein main check karta hu",
    "t-art-lede": "Koi bhi dashboard aapko sab kuch nahi bataata. Ye wahi dus-minute wali routine hai jo main har subah, ticket kholne se pehle, follow karta hu — kai aisi subahon ke baad banayi gayi jab maine ye skip kiya aur baad mein bhugta.",
    "t-art-intro": "Har DBA ke paas is routine ka apna version hota hai, aur har DBA kasam khayega ki uska hi sahi hai. Meri wali kayi baar rebuild ho chuki hai — zyadatar tab jab kuch aisa toota jo do-minute ke check se pehle hi pakda ja sakta tha. Toh ye koi certification guide se copy kiya hua \"best practices\" list nahi hai. Ye wahi actual sequence hai jo main follow karta hu, actual order mein, ticket queue ko haath lagane se pehle.",
    "t-h3-1": "1. Sabse pehle alert log padho, aakhir mein nahi",
    "t-p-1": "Ye baat obvious lagti hai, phir bhi log sabse pehle isi ko skip karte hain. Main sirf ORA- errors ke liye grep nahi karta — puri overnight window scan karta hu. Ek checkpoint jo normal se double time le raha ho, ya ek instance jo chupke se background process restart kar de, error code nahi dega, lekin kuch to bata raha hoga.",
    "t-h3-2": "2. Tablespace aur ASM ka headroom",
    "t-p-2": "Ye main autoextend-on databases par bhi check karta hu, kyunki autoextend ki bhi ek ceiling hoti hai aur disk ki bhi ek limit hoti hai. Raat 2 baje, batch-heavy night par, chupke se 90% ki taraf badhta hua tablespace, Monday morning ka outage bula raha hota hai.",
    "t-h3-3": "3. RMAN backup status — sach mein verify karo, green tick par bharosa mat karo",
    "t-p-3": 'Jo backup job "completed successfully" bole, zaroori nahi ki wo restore bhi ho sake. Main last backup ka completion time expected window se match karta hu, aur hafte mein ek baar uska ek hissa actually validate bhi karta hu.',
    "t-h3-4": "4. Data Guard / standby lag",
    "t-p-4": "Agar standby chala rahe ho, apply lag hi wo metric hai jo chupke se aapke RPO promises barbaad karta hai. Main transport lag aur apply lag alag-alag check karta hu — dono alag reason se fail hote hain, aur inhe mix karna hi real cause miss karne ka tareeka hai.",
    "t-h3-5": "5. Long-running aur blocked sessions",
    "t-p-5": '"System slow hai" ki complaint aane se pehle, mujhe pehle se pata hona chahiye ki kyun. Blocking sessions par ek paanch-second ki nazar, baad mein app-team ke twenty-minute finger-pointing se bacha deti hai.',
    "t-h3-6": "6. Scheduler aur cron jobs — kya kal raat ka batch actually chala?",
    "t-p-6": "Jobs jitna log sochte hain usse zyaada silently fail hote hain, especially chained jobs jisme step teen, step ek ke output par depend karta hai. Main DBA_SCHEDULER_JOB_RUN_DETAILS mein wo dhundta hu jo error status ke saath finish hua ho, sirf wo nahi jo chala hi nahi.",
    "t-h3-7": "7. Pichle 12 ghante ka wait event profile",
    "t-p-7": 'Ye koi full AWR deep-dive nahi — bas overnight top wait class ka ek quick look. Agar "Configuration" ya "User I/O" waits mein achanak shift dikhe jo kal nahi tha, wo performance ticket banne se pehle dekhne layak hai.',
    "t-h3-8": "8. Listener aur connectivity health",
    "t-p-8": "Ek idle listener jisme failed connection attempts ki queue badh rahi ho, network changes ka early symptom hota hai jo kisi ne aapko bataya hi nahi. Main isse khud pakadna prefer karta hu, uske liye page hone se pehle.",
    "t-h3-9": "9. Archive log / FRA space",
    "t-p-9": 'Fast Recovery Area ka bharna un failures mein se hai jo "fine" se "database hung" tak sabse tezi se jaata hai. Ye daily check hota hai, koi exception nahi.',
    "t-h3-10": "10. Kal ki incident tickets — kya fix actually tika?",
    "t-p-10": 'Jo bhi kal patch kiya, uska follow-up aaj hota hai. Ek workaround jo barah ghante tikta hai aur chupke se subah 6 baje wapas aa jaata hai — yahi sabse common tareeka hai jisse "fixed" incidents repeat incidents ban jaate hain.',
    "t-quote": "Ye koi monitoring tools ki jagah nahi leta. Ye is assumption ki jagah leta hai ki monitoring tools sab kuch pakad leti hain — nahi pakadti, especially wo slow, boring failures jo dinon mein chupke se build hoti hain.",
    "t-closing-1": "Ye poori routine, habit banne ke baad, mujhe kareeb dus minute leti hai. Baat individual checks ki nahi hai — aap mein se zyadatar ye pehle se jaante honge. Baat ye hai ki inhe ek fixed order mein, har roz, ticket queue ke priorities decide karne se pehle karna. Jis subah main ye skip karta hu, reliably usi subah kuch mujhe dhoondh leta hai.",
    "t-closing-2": "Aapki morning routine kaisi dikhti hai? Genuinely jaanna chahta hu agar main kuch obvious miss kar raha hu — comments mein batao ya LinkedIn par mujhe dhundo.",
    "t-signoff": "— Momin Mishkat, production support desk se likha gaya, coffee thandi ho chuki hai, hamesha ki tarah.",
    "t2-index-read": "9 min ka read",
    "t2-index-title": "Raat ke 2 Baje ka Restore: Ek RMAN Recovery Scenario jo Main Dobara Nahi Dekhna Chahta",
    "t2-art-read": "9 min ka read",
    "t2-art-title": "Raat ke 2 Baje ka Restore: Ek RMAN Recovery Scenario jo Main Dobara Nahi Dekhna Chahta",
    "t2-art-lede": "Ek corrupted datafile, ek partially-down application, aur ek decision jo mujhe kareeb chaar minute mein lena tha. Ye raha poora recovery, command by command, aur main agli baar kya alag karunga.",
    "t2-art-intro": "Ye kissa ticket se shuru nahi hua. Raat 1:52 baje mera phone baja kyunki monitoring alert app team se pehle hi pahunch chuka tha. Main ye poora detail mein batana chahta hu — wo sanitized \"aur phir humne backup se restore kar diya\" wala version nahi, balki actual sequence, un pandrah seconds samet jo maine screen ghoorte hue guzare ye decide karte hue ki pehle kya NAHI karna hai.",
    "t2-h3-1": "1. Alert — alert log mein ORA-01578",
    "t2-p-1": "Alert log mein ek hi line thi jo matter karti thi, session errors ke ek dhher ke upar chupchap baithi hui jo asal mein sirf symptoms the. Yahi wo line hai jo bataati hai ki ye slow query ka issue nahi hai — ye ek block ka issue hai.",
    "t2-p-1b": "Pehla rule jo maine mushkil se seekha: abhi kuch mat chhedo. Instance restart mat karo, listener bounce mat karo, kisi ko \"bas ek baar phir try karne do\" mat karne do. Corruption apne aap theek nahi hoti, aur ek galat restart ek contained problem ko bahut bada issue bana sakta hai.",
    "t2-h3-2": "2. Kuch bhi karne se pehle blast radius confirm karo",
    "t2-p-2": "Alert log mein report hua ek corrupt block ye nahi bataata ki wo ek block hai ya pachaas. Maine poore datafile ke against ek validate chalaya kisi approach par decide karne se pehle, kyunki recovery method genuinely is jawab par depend karta hai.",
    "t2-p-2b": "Is case mein result aaya teen contiguous blocks, sab ek hi datafile mein, sab USERS tablespace mein. Poora datafile nahi — bas ek chhota, localized patch. Isi ek fact ne agle step ke baare mein sab kuch badal diya.",
    "t2-h3-3": "3. Block-level recovery vs. full datafile restore",
    "t2-p-3": "Yahi wo decision point hai jise log jaldi mein nikal jaate hain. Full datafile restore is sense mein safer hai ki reason karna simple hai, lekin iska matlab hai poori file ko restore aur roll-forward karna — zyada I/O, zyada downtime, tablespace zyada der offline. Teen isolated blocks aur ek recent backup available hone ke saath, block-level recovery faster aur lower-impact option tha, aur Oracle exactly is case ko support karta hai.",
    "t2-h3-4": "4. Sirf wahi offline lena jo zaroori ho",
    "t2-p-4": "Kyunki corruption sirf ek datafile tak simit tha ek tablespace mein jisme aur bhi datafiles the, mujhe poori application down nahi karni padi — bas ye accept karna tha ki USERS data ka ek hissa un chand minutes ke liye unavailable rahega jab recovery chal rahi thi. Yahi fark hai partial degradation aur full outage mein, aur ye check karna zaroori hai maintenance window assume karne se pehle.",
    "t2-h3-5": "5. Block recovery run karna",
    "t2-p-5": "Validate step se mile exact file aur block numbers ke saath, BLOCKRECOVER seedha source tak jaata hai — ye poori file ki jagah sirf un blocks ko restore aur redo apply karta hai.",
    "t2-p-5b": "Agar corruption poore datafile ko cover karta hua wapas aata, tight cluster ki jagah, to yahi wo point hota jahan main plan switch karta — datafile ko offline lekar, poori file restore aur recover karke, phir wapas online laakar. Dono paths pata hona zaroori hai isse pehle ki aap raat 2 baje decision ke saamne khade ho.",
    "t2-h3-6": "6. Victory declare karne se pehle dubara validate karo",
    "t2-p-6": "Ek recovery jo \"completed successfully\" ho, usse main utni hi skepticism deta hu jitni ek backup ko jo \"completed successfully\" ho. Maine validate dubara chalaya aur corruption view dubara check kiya kisi ko batane se pehle ki incident band ho gaya.",
    "t2-h3-7": "7. Root cause — aur \"disk issue\" jawab kyun nahi hai",
    "t2-p-7": "Storage team ka pehla jawab tha 'disk issue,' jo asal mein kuch nahi bataata. Actual trigger dhoondne ke liye storage controller logs par joint look lagana pada — ek firmware-level write error jo usi raat earlier maintenance window ke dauraan hua aur kabhi humein flag hi nahi hua. Specific jawab ke liye push karna zaroori hai, kyunki ye seedha decide karta hai ki ye agle mahine dobara hoga ya nahi.",
    "t2-h3-8": "8. Iske baad maine kya badla",
    "t2-p-8": "Teen cheezein turant implement hui: block change tracking, taaki future incremental recoveries faster ho; corruption ke alert log mein khud announce hone ka wait karne ki jagah, ek proactive weekly VALIDATE DATABASE job; aur ek direct alert jo kisi bhi ORA-01578 ya v$database_block_corruption row aane par page kare — kisi ke sahi waqt par alert log padhne par depend karne ki jagah.",
    "t2-quote": "Backup safety net nahi hai. Exactly ye jaanna ki kaunsi recovery command, kaunse scenario ke liye chalani hai, isse pehle ki aap ek ke beech khade ho — yahi actual safety net hai.",
    "t2-closing-1": "Poora incident, page se all-clear tak, kareeb pachees-chalees minute liya. Zyaadatar waqt validate steps mein gaya, aur mujhe ek minute ka bhi afsos nahi — ek recovery jo verify nahi hui, wo bas extra steps wala guess hai. Jo cheez saalon mein bani wo RMAN syntax nahi thi; wo judgment thi ki diye gaye corruption ke liye do recovery paths mein se kaunsa actually chahiye.",
    "t2-closing-2": "Kya aapne kabhi production mein block-level recovery chalayi hai, ya hamesha seedha full restore par gaye? Curious hu ki dusre log ye trade-off kaise weigh karte hain — LinkedIn par mujhe dhundo.",
    "t2-signoff": "— Momin Mishkat, production support desk se likha gaya, coffee thandi ho chuki hai, hamesha ki tarah."
  };

  // ---------- TECH FILTER ----------
  const techTabs = document.querySelectorAll('.tech-tab');
  const postEntries = document.querySelectorAll('.post-entry');
  techTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      techTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.dataset.tech;
      postEntries.forEach(entry => {
        const match = filter === 'all' || entry.dataset.tech === filter;
        entry.classList.toggle('hidden', !match);
      });
    });
  });

  // ---------- COPY CODE BUTTONS ----------
  document.querySelectorAll('.codeblock').forEach(block => {
    const btn = document.createElement('button');
    btn.className = 'copy-code-btn';
    btn.textContent = 'Copy';
    btn.addEventListener('click', () => {
      const text = block.innerText.replace('Copy', '').trim();
      navigator.clipboard.writeText(text).then(() => {
        btn.textContent = 'Copied!';
        btn.classList.add('copied');
        setTimeout(() => { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 1800);
      });
    });
    block.appendChild(btn);
  });

  // ---------- COPY LINK BUTTONS ON ARTICLES ----------
  document.querySelectorAll('article').forEach(art => {
    const btn = document.createElement('button');
    btn.className = 'copy-link-btn';
    btn.textContent = '🔗 Copy link';
    btn.addEventListener('click', () => {
      const url = window.location.origin + window.location.pathname + '#' + art.id;
      navigator.clipboard.writeText(url).then(() => {
        btn.textContent = '✓ Copied';
        setTimeout(() => { btn.textContent = '🔗 Copy link'; }, 1800);
      });
    });
    const metaRow = art.querySelector('.meta-row');
    if (metaRow) metaRow.appendChild(btn);
  });

  const langBtn = document.getElementById('langToggle');
  const originals = {};
  let isHinglish = false;

  langBtn.addEventListener('click', () => {
    isHinglish = !isHinglish;
    langBtn.textContent = isHinglish ? 'English' : 'हिंग्लिश';
    langBtn.classList.toggle('active', isHinglish);
    document.documentElement.lang = isHinglish ? 'hi' : 'en';

    Object.keys(hinglish).forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      if (isHinglish) {
        if (!(id in originals)) originals[id] = el.innerHTML;
        el.innerHTML = hinglish[id];
      } else if (originals[id] !== undefined) {
        el.innerHTML = originals[id];
      }
    });
  });
