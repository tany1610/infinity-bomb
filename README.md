# Infinity Bomb  

**Infinity Bomb** is a pixel-art roguelike game about defusing a bomb wire by wire.  
The player starts with limited lives (fuses), coins, and skips, and faces randomly generated wires — each with a unique explosion chance. Cutting the wrong wire costs a fuse, while surviving rewards coins based on risk: higher risk means higher reward.  

Between rounds, players can buy items from the shop to improve their chances, reveal hidden information, or manipulate the bomb. The goal is simple: **survive as many rounds as possible before running out of fuses.**  

## Key Features
- 🎲 High-risk/high-reward gameplay with randomly generated wires  
- 🛒 Shop system with unique items and inventory management  
- 💥 Explosions, skips, and strategic choices each round  
- 📈 Progression with new mechanics unlocking every 10 rounds  
- 🎓 Tutorial & immersive effects to keep the tension high  


# 🗺️ Infinity Bomb Roadmap

### **Phase 1 – Core foundation**
- [x] Main Menu (Start / Quit)  
- [x] Game Loop (8 wires with unique explosion chances, 3 fuses, 100 coins, 3 skips, rewards)  
- [x] Blast Shop (4 random items, no duplicates)  
- [x] Inventory (6 slots, hover descriptions)  
- [x] End Game Screen (displays survived rounds, game over)  
- [x] Sound & Music (explosion, item purchase, background music)  
✅ *Already implemented.*  

---

### **Phase 2 – Mandatory Core Progression**
- 🔓 **Unlock System** – new mechanics every X rounds.  
  - Round 10 → Black Market.  
  - Round 20 → Random Events.  
  - Round 30 → (to be decided as third unlock).  
- 🛒 **Black Market Shop**  
  - Separate panel/tab on the screen.  
  - 1 random item per round (random effect or shadow copy).  
- 🎲 **Random Events System**  
  - RandomEvent Manager → communicates with GameManager.  
  - Clear list of events (Bomb Malfunction, Bonus Round, Sabotage, Short Circuit, etc.).  
- 💡 **More progressions** (to be refined).  

---

### **Phase 3 – Mandatory Utility & UX**
- 🎓 **Tutorial / How to Play**  
  - Checkbox in the main menu → if checked → triggers Tutorial scene.  
  - Covers all mechanics (Shop, Black Market, Events, items).  
- ⏸️ **Pause Menu** (Resume / Restart / Quit).  
- 💾 **Basic Save System**  
  - High score (most survived rounds, most coins).  
  - Save unlocked mechanics (if we add permanent progression).  
- 🔄 **Restart option** on Game Over screen.  

---

### **Phase 4 – Polish & Balance**
- ✨ **Immersion/Presentation**  
  - Animations (bomb lid opening/closing, sparks, smoke, pulsing background).  
  - UI polish (shake effects, animated coin counter).  
- ⚖️ **Balancing Items** (prices, effects, usefulness).  
  - Drone → more expensive or chance to fail.  
  - Wire Swap → cheaper / reroll shop.  
  - Greedy Snip → softer penalty.  
- ⚙️ **Settings Menu** (volume, fullscreen, tutorial toggle).  

---

### **Phase 5 – Optional (if time allows)**
- 📅 **Daily Modifiers** – global effect for each run.  
- 🏆 **Extended High Score / Stats** – statistics (total games played, total fuses lost, etc.).  
