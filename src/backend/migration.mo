import Time "mo:core/Time";

module {
  type Note = {
    title : Text;
    body : Text;
    isUnlocked : Bool;
  };

  type OldActor = {
    notes : [Note];
    startDate : ?Time.Time;
  };

  type NewActor = {
    notes : [Note];
    startDate : ?Time.Time;
  };

  public func run(old : OldActor) : NewActor {
    let newNotes = [
      {
        title = "Day 1 — HIEYEYEYEYEYEYEYEYEYEY my babyyyyy 🥰🥰🥰🥰🥰🥰🥰";
        body = "HIEYEYEYEYEYEYEYEYEYEY my babyyyyy 🥰🥰🥰🥰🥰🥰🥰 hope you have a wonderful day ahead and pls take care of yourself, i love you so much 🥰";
        isUnlocked = true;
      },
      {
        title = "Day 2 — I love you dhuniya me sabse sabseee zada";
        body = "i love you to the moon and back and i love you dhuniya me sabse sabseee zada so pls take care of yourself today and hoping you have a bomb day ahead 😘";
        isUnlocked = false;
      },
      {
        title = "Day 3 — I bet you im missing you rn";
        body = "i bet you im missing you rn and probably overthinking on smth stupid because i just cant help myself 👅 aaj aapne kitne killo hagga? 🤣";
        isUnlocked = false;
      },
      {
        title = "Day 4 — HAAPPPYYYY HOLIIII MERI JAAANNNNNN 🥰🥰🥰🥰🥰";
        body = "HAAPPPYYYY HOLIIII MERI JAAANNNNNN 🥰🥰🥰🥰🥰 i wish we could play holi together but IM GONNA SPEND THE REST OF MY LIFE WITH YOU SO WE WILL BABY 🥰";
        isUnlocked = false;
      },
      {
        title = "Day 5 — That sexy fucking body 🤤";
        body = "really hope that you cleansed yourself properly and that gorgeous body too 🤤 and TAKE CARE OF THAT GORGEOUS FACE I HOPE THERES NO PAKKA RANG REMAINING 😭";
        isUnlocked = false;
      },
      {
        title = "Day 6 — Wishing you a banger day today";
        body = "i hope for you to have a banger day today and wish you best of lucks for jheling my saala 🤭, and dont think abt me while reading this cause mai mara hua hunga (sst exam)";
        isUnlocked = false;
      },
      {
        title = "Day 7 — MERA EXAM KHATAM HOGAAYAYAYAY YAAAYYYYYYY 🥰🥰🥰🥰";
        body = "MERA EXAM KHATAM HOGAAYAYAYAY YAAAYYYYYYY 🥰🥰🥰🥰 i love you so much my baby def more than you 😘";
        isUnlocked = false;
      },
      {
        title = "Day 8 — FINALLY YOUR BROTHER GONE CALL ME TONIGHT BB 😘😘";
        body = "FINALLY YOUR BROTHER GONE CALL ME TONIGHT BB 😘😘";
        isUnlocked = false;
      },
    ];
    { notes = newNotes; startDate = old.startDate };
  };
};
