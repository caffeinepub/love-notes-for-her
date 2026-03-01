import Time "mo:core/Time";
import Int "mo:core/Int";
import Array "mo:core/Array";
import Migration "migration";

(with migration = Migration.run)
actor {
  type Note = {
    title : Text;
    body : Text;
    isUnlocked : Bool;
  };

  let notes = [
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

  var startDate : ?Time.Time = null;

  func getDaysSinceStart() : Int {
    switch (startDate) {
      case (null) { 0 };
      case (?start) {
        let currentTime = Time.now();
        let daysPassed = (currentTime - start) / (24 * 60 * 60 * 1000000000);
        if (daysPassed < 0) { 1 } else { Int.abs(daysPassed) + 1 };
      };
    };
  };

  public shared ({ caller }) func initializeAndGetDay() : async Int {
    switch (startDate) {
      case (null) {
        startDate := ?Time.now();
        1;
      };
      case (_) { getDaysSinceStart() };
    };
  };

  public query ({ caller }) func getNotes() : async [Note] {
    let currentDay = getDaysSinceStart();
    notes.map(
      func(note) {
        if (currentDay > 0) {
          { note with isUnlocked = true };
        } else {
          { note with body = ""; isUnlocked = false };
        };
      }
    );
  };

  public query ({ caller }) func getCurrentDay() : async Int {
    getDaysSinceStart();
  };
};
