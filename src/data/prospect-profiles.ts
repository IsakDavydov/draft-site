/**
 * Prospect profile data: impact meters (1-10), play style tags, and analysis.
 * Update the analysis text for each player as you refine your evaluations.
 */

export interface ProspectProfile {
  immediateImpact: number; // 1-10
  potential: number; // 1-10
  riskLevel: number; // 1-10 (higher = more risk)
  playStyleTags: string[];
  analysis: string;
}

export const prospectProfiles: Record<string, ProspectProfile> = {
  '1': { // Fernando Mendoza
    immediateImpact: 7,
    potential: 9,
    riskLevel: 2,
    playStyleTags: ['Polished', 'Pocket passer', 'Arm talent', 'Decision maker'],
    analysis:
      'Mendoza is the most pro-ready quarterback in this class with excellent footwork and anticipation. He reads defenses quickly and delivers with accuracy from the pocket. His ceiling is that of a franchise cornerstone if he continues to develop his deep-ball consistency.',
  },
  '2': { // Jeremiyah Love
    immediateImpact: 8,
    potential: 10,
    riskLevel: 2,
    playStyleTags: ['Explosive', 'Receiving back', 'Elusive', 'Big play'],
    analysis:
      'Love brings elite burst and home-run ability every time he touches the ball. He can contribute immediately as a change-of-pace back and pass catcher. With refinement in pass protection, he has three-down workhorse potential.',
  },
  '3': { // Rueben Bain Jr.
    immediateImpact: 8,
    potential: 9,
    riskLevel: 5,
    playStyleTags: ['Versatile', 'High motor', 'Pass rush', 'Run stopper'],
    analysis:
      'Bain has inside-outside versatility and disrupts every down with his relentless pursuit. He wins with burst and technique, and his motor never stops. He projects as an impact defender from day one with Pro Bowl upside.',
  },
  '4': { // Caleb Downs
    immediateImpact: 9,
    potential: 9,
    riskLevel: 3,
    playStyleTags: ['Box safety', 'Leader', 'Tackler', 'Versatile'],
    analysis:
      'Downs has been elite since his freshman year and brings rare intangibles to a defensive backfield. He excels in the box and can matchup in coverage. His leadership and football IQ make him a culture-setter for any franchise.',
  },
  '5': { // Sonny Styles
    immediateImpact: 7,
    potential: 9,
    riskLevel: 4,
    playStyleTags: ['Former safety', 'Tackler', 'Coverage', 'Physical'],
    analysis:
      'Styles converted from safety and became one of the best tacklers in college football with almost no misses. He flows to the ball naturally and brings an enforcer mentality. His coverage will only improve with more reps.',
  },
  '6': { // Jordyn Tyson
    immediateImpact: 6,
    potential: 10,
    riskLevel: 6,
    playStyleTags: ['Electric', 'YAC', 'Contested catches', 'Big play'],
    analysis:
      'Tyson has the highest ceiling in the receiver class with rare ball skills and after-catch ability. He needs development in route polish but his ceiling is elite. He can be a game-changer in the right scheme.',
  },
  '7': { // David Bailey
    immediateImpact: 6,
    potential: 9,
    riskLevel: 6,
    playStyleTags: ['Burst', 'Pass rush', 'Production', 'Upside'],
    analysis:
      'Bailey led the nation in sacks and wins with explosive get-off. His size raises questions about run defense, but his pass-rush traits are undeniable. A team drafting him is betting on his high ceiling.',
  },
  '8': { // Arvell Reese Jr.
    immediateImpact: 5,
    potential: 9,
    riskLevel: 7,
    playStyleTags: ['Athletic', 'Pass rush', 'Raw', 'Upside'],
    analysis:
      'Reese has elite athleticism and started the season strong before fading. His first season as a full-time edge means his best football is ahead. He is a high-risk, high-reward development prospect.',
  },
  '9': { // Makai Lemon
    immediateImpact: 7,
    potential: 8,
    riskLevel: 4,
    playStyleTags: ['Route runner', 'Contested catch', 'Separation', 'Versatile'],
    analysis:
      'Lemon has the highest floor among receivers with clean routes and reliable hands. He can win at all levels and contributes on day one. His ceiling may be capped but he is a safe, productive pick.',
  },
  '10': { // Francis Mauigoa
    immediateImpact: 8,
    potential: 9,
    riskLevel: 3,
    playStyleTags: ['Mauler', 'Pass pro', 'Run blocker', 'OT1'],
    analysis:
      'Mauigoa is the top tackle in the class with rare power in the run game. He rarely allows pressures and has the feet to stay at tackle. He is a day-one starter with All-Pro potential.',
  },
  '11': { // Jermod McCoy
    immediateImpact: 5,
    potential: 9,
    riskLevel: 7,
    playStyleTags: ['Man coverage', 'Ball skills', 'Athletic', 'Injury concern'],
    analysis:
      'McCoy missed the season with injury but his 2024 tape was exceptional. He has shutdown potential with fluid movement and ball skills. The medical evaluation will dictate his draft slot.',
  },
  '12': { // Carnell Tate
    immediateImpact: 7,
    potential: 9,
    riskLevel: 4,
    playStyleTags: ['Route runner', 'Contested catch', 'Complete', 'Pro ready'],
    analysis:
      'Tate runs every route at a high level and wins contested situations. He has the size and polish to contribute immediately. His ceiling is that of a true WR1 in the right offense.',
  },
  '13': { // Olaivavega Ioane
    immediateImpact: 8,
    potential: 9,
    riskLevel: 3,
    playStyleTags: ['Mauler', 'Interior', 'Pass pro', 'Day one starter'],
    analysis:
      'Ioane is the best interior lineman in the class and moves people at will. He allowed zero sacks and is ready to start immediately. He will anchor an offensive line for years.',
  },
  '14': { // Mansoor Delane
    immediateImpact: 7,
    potential: 8,
    riskLevel: 4,
    playStyleTags: ['Man corner', 'Technique', 'Physical', 'Coverage'],
    analysis:
      'Delane locked down SEC receivers with sound technique and toughness. He transferred well and filled a major need. He can start outside and contribute in press-man schemes.',
  },
  '15': { // Spencer Fano
    immediateImpact: 7,
    potential: 8,
    riskLevel: 4,
    playStyleTags: ['Versatile', 'Run blocker', 'Pass pro', 'Guard-tackle'],
    analysis:
      'Fano offers position flexibility and can play tackle or kick inside. He is a mauler in the run game with improving pass protection. He provides immediate depth with starter upside.',
  },
  '16': { // Kayden McDonald
    immediateImpact: 6,
    potential: 8,
    riskLevel: 5,
    playStyleTags: ['Size', 'Pass rush', 'Run defense', 'Upside'],
    analysis:
      'McDonald dominated the Senior Bowl and has rare size for his position. He offers both pass and run value. He is still developing but has huge upside based on his frame.',
  },
  '17': { // Peter Woods
    immediateImpact: 6,
    potential: 8,
    riskLevel: 5,
    playStyleTags: ['Versatile', 'Pass rush', 'Run defense', 'Upside'],
    analysis:
      'Woods looked like a first-rounder as a freshman but slipped after a down year. He offers upside in both phases. A team drafting him is betting on the traits he showed earlier.',
  },
  '18': { // Avieon Terrell
    immediateImpact: 7,
    potential: 8,
    riskLevel: 5,
    playStyleTags: ['Physical', 'Technique', 'Ball skills', 'Undersized'],
    analysis:
      'Terrell plays bigger than his size with elite technique and five forced fumbles. He has mastered the peanut punch. His lack of ideal length is the main concern.',
  },
  '19': { // Caleb Banks
    immediateImpact: 6,
    potential: 8,
    riskLevel: 5,
    playStyleTags: ['Size', 'Pass rush', 'Run stopper', 'Upside'],
    analysis:
      'Banks has dominant physical traits and can impact both phases. He needs consistency but the upside is significant. He can be a disruptive force with proper development.',
  },
  '20': { // Monroe Freeling
    immediateImpact: 6,
    potential: 8,
    riskLevel: 5,
    playStyleTags: ['Size', 'Upside', 'Limited sample', 'Tackle'],
    analysis:
      'Freeling has limited starts but showed real promise this season. His frame is ideal for tackle and he has been climbing boards. He could develop into a cornerstone lineman.',
  },
  '21': { // Emmanuel McNeil-Warren
    immediateImpact: 6,
    potential: 8,
    riskLevel: 5,
    playStyleTags: ['Versatile', 'Physical', 'Tackler', 'Size'],
    analysis:
      'McNeil-Warren brings size and versatility to the secondary. He plays mean and causes turnovers. Small-school background raises competition questions but the tape speaks.',
  },
  '22': { // CJ Allen
    immediateImpact: 7,
    potential: 8,
    riskLevel: 4,
    playStyleTags: ['Tackler', 'Run defense', 'Leadership', 'Scheme fit'],
    analysis:
      'Allen led a pro-style Georgia defense and is an elite run defender. His coverage can improve but he has no problem transitioning. He is a safe, productive linebacker.',
  },
  '23': { // Kadyn Proctor
    immediateImpact: 6,
    potential: 9,
    riskLevel: 6,
    playStyleTags: ['Size', 'Upside', 'Pass pro', 'Raw'],
    analysis:
      'Proctor has rare size and can be dominant when he plays to it. He needs to strengthen his base and consistency. If he puts it together, he is a franchise tackle.',
  },
  '24': { // Lee Hunter
    immediateImpact: 7,
    potential: 8,
    riskLevel: 4,
    playStyleTags: ['Pass rush', 'Run stopper', 'Motor', 'Complete'],
    analysis:
      'Hunter is a well-rounded defensive tackle who affects both phases. He wins with technique and effort. He can start early and grow into a key piece.',
  },
  '25': { // T.J. Parker
    immediateImpact: 6,
    potential: 8,
    riskLevel: 5,
    playStyleTags: ['Every down', 'Pass rush', 'Run defense', 'Versatile'],
    analysis:
      'Parker did not have the year many hoped but the traits remain. He can play every down and impact run and pass. His development curve will determine his ceiling.',
  },
  '26': { // Keldric Faulk
    immediateImpact: 6,
    potential: 7,
    riskLevel: 5,
    playStyleTags: ['Athletic', 'Upside', 'Developing'],
    analysis:
      'A talented prospect with room to grow at the next level. His blend of physical tools and collegiate production suggests he can contribute early while developing into a core piece. Further evaluation will refine his projection.',
  },
  '27': { // Kenyon Sadiq
    immediateImpact: 6,
    potential: 7,
    riskLevel: 5,
    playStyleTags: ['Athletic', 'Upside', 'Developing'],
    analysis:
      'A talented prospect with room to grow at the next level. His blend of physical tools and collegiate production suggests he can contribute early while developing into a core piece. Further evaluation will refine his projection.',
  },
  '28': { // KC Concepcion
    immediateImpact: 6,
    potential: 7,
    riskLevel: 5,
    playStyleTags: ['Athletic', 'Upside', 'Developing'],
    analysis:
      'A talented prospect with room to grow at the next level. His blend of physical tools and collegiate production suggests he can contribute early while developing into a core piece. Further evaluation will refine his projection.',
  },
  '29': { // Caleb Lomu
    immediateImpact: 6,
    potential: 7,
    riskLevel: 5,
    playStyleTags: ['Athletic', 'Upside', 'Developing'],
    analysis:
      'A talented prospect with room to grow at the next level. His blend of physical tools and collegiate production suggests he can contribute early while developing into a core piece. Further evaluation will refine his projection.',
  },
  '30': { // Denzel Boston
    immediateImpact: 6,
    potential: 7,
    riskLevel: 5,
    playStyleTags: ['Athletic', 'Upside', 'Developing'],
    analysis:
      'A talented prospect with room to grow at the next level. His blend of physical tools and collegiate production suggests he can contribute early while developing into a core piece. Further evaluation will refine his projection.',
  },
  '31': { // Omar Cooper Jr.
    immediateImpact: 6,
    potential: 7,
    riskLevel: 5,
    playStyleTags: ['Athletic', 'Upside', 'Developing'],
    analysis:
      'A talented prospect with room to grow at the next level. His blend of physical tools and collegiate production suggests he can contribute early while developing into a core piece. Further evaluation will refine his projection.',
  },
  '32': { // Ty Simpson
    immediateImpact: 6,
    potential: 7,
    riskLevel: 5,
    playStyleTags: ['Athletic', 'Upside', 'Developing'],
    analysis:
      'A talented prospect with room to grow at the next level. His blend of physical tools and collegiate production suggests he can contribute early while developing into a core piece. Further evaluation will refine his projection.',
  },
  '33': { // Emmanuel Pregnon
    immediateImpact: 6,
    potential: 7,
    riskLevel: 5,
    playStyleTags: ['Athletic', 'Upside', 'Developing'],
    analysis:
      'A talented prospect with room to grow at the next level. His blend of physical tools and collegiate production suggests he can contribute early while developing into a core piece. Further evaluation will refine his projection.',
  },
  '34': { // Cashius Howell
    immediateImpact: 6,
    potential: 7,
    riskLevel: 5,
    playStyleTags: ['Athletic', 'Upside', 'Developing'],
    analysis:
      'A talented prospect with room to grow at the next level. His blend of physical tools and collegiate production suggests he can contribute early while developing into a core piece. Further evaluation will refine his projection.',
  },
  '35': { // Akheem Mesidor
    immediateImpact: 6,
    potential: 7,
    riskLevel: 5,
    playStyleTags: ['Athletic', 'Upside', 'Developing'],
    analysis:
      'A talented prospect with room to grow at the next level. His blend of physical tools and collegiate production suggests he can contribute early while developing into a core piece. Further evaluation will refine his projection.',
  },
  '36': { // Christen Miller
    immediateImpact: 6,
    potential: 7,
    riskLevel: 5,
    playStyleTags: ['Athletic', 'Upside', 'Developing'],
    analysis:
      'A talented prospect with room to grow at the next level. His blend of physical tools and collegiate production suggests he can contribute early while developing into a core piece. Further evaluation will refine his projection.',
  },
  '37': { // Brandon Cisse
    immediateImpact: 6,
    potential: 7,
    riskLevel: 5,
    playStyleTags: ['Athletic', 'Upside', 'Developing'],
    analysis:
      'A talented prospect with room to grow at the next level. His blend of physical tools and collegiate production suggests he can contribute early while developing into a core piece. Further evaluation will refine his projection.',
  },
  '38': { // Zachariah Branch
    immediateImpact: 6,
    potential: 7,
    riskLevel: 5,
    playStyleTags: ['Athletic', 'Upside', 'Developing'],
    analysis:
      'A talented prospect with room to grow at the next level. His blend of physical tools and collegiate production suggests he can contribute early while developing into a core piece. Further evaluation will refine his projection.',
  },
  '39': { // Blake Miller
    immediateImpact: 6,
    potential: 7,
    riskLevel: 5,
    playStyleTags: ['Athletic', 'Upside', 'Developing'],
    analysis:
      'A talented prospect with room to grow at the next level. His blend of physical tools and collegiate production suggests he can contribute early while developing into a core piece. Further evaluation will refine his projection.',
  },
  '40': { // Colton Hood
    immediateImpact: 6,
    potential: 7,
    riskLevel: 5,
    playStyleTags: ['Athletic', 'Upside', 'Developing'],
    analysis:
      'A talented prospect with room to grow at the next level. His blend of physical tools and collegiate production suggests he can contribute early while developing into a core piece. Further evaluation will refine his projection.',
  },
  '41': { // Keith Abney II
    immediateImpact: 6,
    potential: 7,
    riskLevel: 5,
    playStyleTags: ['Athletic', 'Upside', 'Developing'],
    analysis:
      'A talented prospect with room to grow at the next level. His blend of physical tools and collegiate production suggests he can contribute early while developing into a core piece. Further evaluation will refine his projection.',
  },
  '42': { // R Mason Thomas
    immediateImpact: 6,
    potential: 7,
    riskLevel: 5,
    playStyleTags: ['Athletic', 'Upside', 'Developing'],
    analysis:
      'A talented prospect with room to grow at the next level. His blend of physical tools and collegiate production suggests he can contribute early while developing into a core piece. Further evaluation will refine his projection.',
  },
  '43': { // Dillon Thieneman
    immediateImpact: 6,
    potential: 7,
    riskLevel: 5,
    playStyleTags: ['Athletic', 'Upside', 'Developing'],
    analysis:
      'A talented prospect with room to grow at the next level. His blend of physical tools and collegiate production suggests he can contribute early while developing into a core piece. Further evaluation will refine his projection.',
  },
  '44': { // Max Iheanachor
    immediateImpact: 6,
    potential: 7,
    riskLevel: 5,
    playStyleTags: ['Athletic', 'Upside', 'Developing'],
    analysis:
      'A talented prospect with room to grow at the next level. His blend of physical tools and collegiate production suggests he can contribute early while developing into a core piece. Further evaluation will refine his projection.',
  },
  '45': { // Chris Brazzell II
    immediateImpact: 6,
    potential: 7,
    riskLevel: 5,
    playStyleTags: ['Athletic', 'Upside', 'Developing'],
    analysis:
      'A talented prospect with room to grow at the next level. His blend of physical tools and collegiate production suggests he can contribute early while developing into a core piece. Further evaluation will refine his projection.',
  },
  '46': { // Zion Young
    immediateImpact: 6,
    potential: 7,
    riskLevel: 5,
    playStyleTags: ['Athletic', 'Upside', 'Developing'],
    analysis:
      'A talented prospect with room to grow at the next level. His blend of physical tools and collegiate production suggests he can contribute early while developing into a core piece. Further evaluation will refine his projection.',
  },
  '47': { // Eli Stowers
    immediateImpact: 6,
    potential: 7,
    riskLevel: 5,
    playStyleTags: ['Athletic', 'Upside', 'Developing'],
    analysis:
      'A talented prospect with room to grow at the next level. His blend of physical tools and collegiate production suggests he can contribute early while developing into a core piece. Further evaluation will refine his projection.',
  },
  '48': { // Jadarian Price
    immediateImpact: 6,
    potential: 7,
    riskLevel: 5,
    playStyleTags: ['Athletic', 'Upside', 'Developing'],
    analysis:
      'A talented prospect with room to grow at the next level. His blend of physical tools and collegiate production suggests he can contribute early while developing into a core piece. Further evaluation will refine his projection.',
  },
  '49': { // D'Angelo Ponds
    immediateImpact: 6,
    potential: 7,
    riskLevel: 5,
    playStyleTags: ['Athletic', 'Upside', 'Developing'],
    analysis:
      'A talented prospect with room to grow at the next level. His blend of physical tools and collegiate production suggests he can contribute early while developing into a core piece. Further evaluation will refine his projection.',
  },
  '50': { // Jake Golday
    immediateImpact: 6,
    potential: 7,
    riskLevel: 5,
    playStyleTags: ['Athletic', 'Upside', 'Developing'],
    analysis:
      'A talented prospect with room to grow at the next level. His blend of physical tools and collegiate production suggests he can contribute early while developing into a core piece. Further evaluation will refine his projection.',
  },
  '51': { // Jacob Rodriguez
    immediateImpact: 6,
    potential: 7,
    riskLevel: 5,
    playStyleTags: ['Athletic', 'Upside', 'Developing'],
    analysis:
      'A talented prospect with room to grow at the next level. His blend of physical tools and collegiate production suggests he can contribute early while developing into a core piece. Further evaluation will refine his projection.',
  },
  '52': { // Chase Bisontis
    immediateImpact: 6,
    potential: 7,
    riskLevel: 5,
    playStyleTags: ['Athletic', 'Upside', 'Developing'],
    analysis:
      'A talented prospect with room to grow at the next level. His blend of physical tools and collegiate production suggests he can contribute early while developing into a core piece. Further evaluation will refine his projection.',
  },
  '53': { // Anthony Hill Jr.
    immediateImpact: 6,
    potential: 7,
    riskLevel: 5,
    playStyleTags: ['Athletic', 'Upside', 'Developing'],
    analysis:
      'A talented prospect with room to grow at the next level. His blend of physical tools and collegiate production suggests he can contribute early while developing into a core piece. Further evaluation will refine his projection.',
  },
  '54': { // Romello Height
    immediateImpact: 6,
    potential: 7,
    riskLevel: 5,
    playStyleTags: ['Athletic', 'Upside', 'Developing'],
    analysis:
      'A talented prospect with room to grow at the next level. His blend of physical tools and collegiate production suggests he can contribute early while developing into a core piece. Further evaluation will refine his projection.',
  },
  '55': { // Keionte Scott
    immediateImpact: 6,
    potential: 7,
    riskLevel: 5,
    playStyleTags: ['Athletic', 'Upside', 'Developing'],
    analysis:
      'A talented prospect with room to grow at the next level. His blend of physical tools and collegiate production suggests he can contribute early while developing into a core piece. Further evaluation will refine his projection.',
  },
  '56': { // Chris Bell
    immediateImpact: 6,
    potential: 7,
    riskLevel: 5,
    playStyleTags: ['Athletic', 'Upside', 'Developing'],
    analysis:
      'A talented prospect with room to grow at the next level. His blend of physical tools and collegiate production suggests he can contribute early while developing into a core piece. Further evaluation will refine his projection.',
  },
  '57': { // Josiah Trotter
    immediateImpact: 6,
    potential: 7,
    riskLevel: 5,
    playStyleTags: ['Athletic', 'Upside', 'Developing'],
    analysis:
      'A talented prospect with room to grow at the next level. His blend of physical tools and collegiate production suggests he can contribute early while developing into a core piece. Further evaluation will refine his projection.',
  },
  '58': { // Caleb Tiernan
    immediateImpact: 6,
    potential: 7,
    riskLevel: 5,
    playStyleTags: ['Athletic', 'Upside', 'Developing'],
    analysis:
      'A talented prospect with room to grow at the next level. His blend of physical tools and collegiate production suggests he can contribute early while developing into a core piece. Further evaluation will refine his projection.',
  },
  '59': { // Deion Burks
    immediateImpact: 6,
    potential: 7,
    riskLevel: 5,
    playStyleTags: ['Athletic', 'Upside', 'Developing'],
    analysis:
      'A talented prospect with room to grow at the next level. His blend of physical tools and collegiate production suggests he can contribute early while developing into a core piece. Further evaluation will refine his projection.',
  },
  '60': { // Derrick Moore
    immediateImpact: 6,
    potential: 7,
    riskLevel: 5,
    playStyleTags: ['Athletic', 'Upside', 'Developing'],
    analysis:
      'A talented prospect with room to grow at the next level. His blend of physical tools and collegiate production suggests he can contribute early while developing into a core piece. Further evaluation will refine his projection.',
  },
  '61': { // Gabe Jacas
    immediateImpact: 6,
    potential: 7,
    riskLevel: 5,
    playStyleTags: ['Athletic', 'Upside', 'Developing'],
    analysis:
      'A talented prospect with room to grow at the next level. His blend of physical tools and collegiate production suggests he can contribute early while developing into a core piece. Further evaluation will refine his projection.',
  },
  '62': { // Zakee Wheatley
    immediateImpact: 6,
    potential: 7,
    riskLevel: 5,
    playStyleTags: ['Athletic', 'Upside', 'Developing'],
    analysis:
      'A talented prospect with room to grow at the next level. His blend of physical tools and collegiate production suggests he can contribute early while developing into a core piece. Further evaluation will refine his projection.',
  },
  '63': { // Malik Muhammad
    immediateImpact: 6,
    potential: 7,
    riskLevel: 5,
    playStyleTags: ['Athletic', 'Upside', 'Developing'],
    analysis:
      'A talented prospect with room to grow at the next level. His blend of physical tools and collegiate production suggests he can contribute early while developing into a core piece. Further evaluation will refine his projection.',
  },
  '64': { // Germie Bernard
    immediateImpact: 6,
    potential: 7,
    riskLevel: 5,
    playStyleTags: ['Athletic', 'Upside', 'Developing'],
    analysis:
      'A talented prospect with room to grow at the next level. His blend of physical tools and collegiate production suggests he can contribute early while developing into a core piece. Further evaluation will refine his projection.',
  },
  '65': { // Chris Johnson
    immediateImpact: 6,
    potential: 7,
    riskLevel: 5,
    playStyleTags: ['Athletic', 'Upside', 'Developing'],
    analysis:
      'A talented prospect with room to grow at the next level. His blend of physical tools and collegiate production suggests he can contribute early while developing into a core piece. Further evaluation will refine his projection.',
  },
  '66': { // Jakobi Lane
    immediateImpact: 6,
    potential: 7,
    riskLevel: 5,
    playStyleTags: ['Athletic', 'Upside', 'Developing'],
    analysis:
      'A talented prospect with room to grow at the next level. His blend of physical tools and collegiate production suggests he can contribute early while developing into a core piece. Further evaluation will refine his projection.',
  },
  '67': { // Daylen Everette
    immediateImpact: 6,
    potential: 7,
    riskLevel: 5,
    playStyleTags: ['Athletic', 'Upside', 'Developing'],
    analysis:
      'A talented prospect with room to grow at the next level. His blend of physical tools and collegiate production suggests he can contribute early while developing into a core piece. Further evaluation will refine his projection.',
  },
  '68': { // Mike Washington Jr.
    immediateImpact: 6,
    potential: 7,
    riskLevel: 5,
    playStyleTags: ['Athletic', 'Upside', 'Developing'],
    analysis:
      'A talented prospect with room to grow at the next level. His blend of physical tools and collegiate production suggests he can contribute early while developing into a core piece. Further evaluation will refine his projection.',
  },
  '69': { // Eric McAlister
    immediateImpact: 6,
    potential: 7,
    riskLevel: 5,
    playStyleTags: ['Athletic', 'Upside', 'Developing'],
    analysis:
      'A talented prospect with room to grow at the next level. His blend of physical tools and collegiate production suggests he can contribute early while developing into a core piece. Further evaluation will refine his projection.',
  },
  '70': { // Davison Igbinosun
    immediateImpact: 6,
    potential: 7,
    riskLevel: 5,
    playStyleTags: ['Athletic', 'Upside', 'Developing'],
    analysis:
      'A talented prospect with room to grow at the next level. His blend of physical tools and collegiate production suggests he can contribute early while developing into a core piece. Further evaluation will refine his projection.',
  },
  '71': { // Max Klare
    immediateImpact: 6,
    potential: 7,
    riskLevel: 5,
    playStyleTags: ['Athletic', 'Upside', 'Developing'],
    analysis:
      'A talented prospect with room to grow at the next level. His blend of physical tools and collegiate production suggests he can contribute early while developing into a core piece. Further evaluation will refine his projection.',
  },
  '72': { // Connor Lew
    immediateImpact: 6,
    potential: 7,
    riskLevel: 5,
    playStyleTags: ['Athletic', 'Upside', 'Developing'],
    analysis:
      'A talented prospect with room to grow at the next level. His blend of physical tools and collegiate production suggests he can contribute early while developing into a core piece. Further evaluation will refine his projection.',
  },
  '73': { // A.J. Haulcy
    immediateImpact: 6,
    potential: 7,
    riskLevel: 5,
    playStyleTags: ['Athletic', 'Upside', 'Developing'],
    analysis:
      'A talented prospect with room to grow at the next level. His blend of physical tools and collegiate production suggests he can contribute early while developing into a core piece. Further evaluation will refine his projection.',
  },
  '74': { // Gracen Halton
    immediateImpact: 6,
    potential: 7,
    riskLevel: 5,
    playStyleTags: ['Athletic', 'Upside', 'Developing'],
    analysis:
      'A talented prospect with room to grow at the next level. His blend of physical tools and collegiate production suggests he can contribute early while developing into a core piece. Further evaluation will refine his projection.',
  },
  '75': { // Elijah Sarratt
    immediateImpact: 6,
    potential: 7,
    riskLevel: 5,
    playStyleTags: ['Athletic', 'Upside', 'Developing'],
    analysis:
      'A talented prospect with room to grow at the next level. His blend of physical tools and collegiate production suggests he can contribute early while developing into a core piece. Further evaluation will refine his projection.',
  },
};

// Default profile for prospects not in the map above (e.g. future additions)
const defaultProfile: ProspectProfile = {
  immediateImpact: 6,
  potential: 7,
  riskLevel: 5,
  playStyleTags: ['Athletic', 'Upside', 'Developing'],
  analysis:
    'A talented prospect with room to grow at the next level. His blend of physical tools and collegiate production suggests he can contribute early while developing into a core piece. Further evaluation will refine his projection.',
};

export function getProspectProfile(prospectId: string): ProspectProfile {
  return prospectProfiles[prospectId] ?? defaultProfile;
}
