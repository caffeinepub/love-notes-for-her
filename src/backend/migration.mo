import Time "mo:core/Time";
import Array "mo:core/Array";

module {
  type OldNote = {
    title : Text;
    body : Text;
    isUnlocked : Bool;
  };

  type OldActor = {
    notes : [OldNote];
    startDate : ?Time.Time;
  };

  type NewNote = {
    title : Text;
    body : Text;
    isUnlocked : Bool;
  };

  type NewActor = {
    notes : [NewNote];
    startDate : ?Time.Time;
  };

  public func run(old : OldActor) : NewActor {
    let newNotes = [
      {
        title = "Day 1 — Just For You, Aarna";
        body = "Meri jaan, this is my little gift to you — eight notes, one for each day, each one wrapped in love. I just want you to know that you are deeply cared for, cherished, and loved beyond words. I'm right here, always. Open the next one tomorrow — I'll be waiting for you. 💕";
        isUnlocked = true;
      },
      {
        title = "Day 2 — I'm Always Here";
        body = "My baby, no matter what you're going through — a hard day, a quiet moment, a storm in your heart — I'm here. You don't have to face anything alone. Whenever you need me, I'll show up. Always. You are never, ever alone, Aarna. 🌸";
        isUnlocked = false;
      },
      {
        title = "Day 3 — You Make Everything Beautiful";
        body = "Aarna, your smile — god, your smile. It does something to my heart every single time. You make ordinary moments feel like magic. Just by being you, you make the world more beautiful, and I am so lucky I get to see it. 💖";
        isUnlocked = false;
      },
      {
        title = "Day 4 — You Matter So Much";
        body = "Meri jaan, I need you to hear this: you matter. To me, more than I can ever put into words. Your feelings matter. Your dreams matter. You matter. I see you, I appreciate you, and I am so grateful you are in my life. 💝";
        isUnlocked = false;
      },
      {
        title = "Day 5 — Together, Always";
        body = "My love, I think about all the little moments with you and my heart feels so full. Whatever life brings — the good days, the messy ones, the in-between ones — I want to be right there with you. You and me, Aarna. Always. 🌹";
        isUnlocked = false;
      },
      {
        title = "Day 6 — I See Your Strength";
        body = "Baby, you are so much stronger than you know. I see the way you carry things, the way you keep going even when it's hard. You inspire me every single day. I'm proud of you — not just for what you do, but for who you are. 💗";
        isUnlocked = false;
      },
      {
        title = "Day 7 — Every Moment With You";
        body = "Meri jaan, I treasure every memory we've made — every laugh, every quiet moment, every little thing. Thank you for trusting me, for letting me in. I hold all of it so close to my heart. You are my favourite person, Aarna. ✨";
        isUnlocked = false;
      },
      {
        title = "Day 8 — Forever and Always";
        body = "Aarna, my love for you doesn't have an expiry date. It grows every single day, quietly and surely. I care about you so deeply — your happiness, your peace, your heart. I'm here for all of it. With all my love, forever. 💕";
        isUnlocked = false;
      },
    ];
    { notes = newNotes; startDate = old.startDate };
  };
};
