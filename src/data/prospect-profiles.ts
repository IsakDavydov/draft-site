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
      'Mendoza is the top QB in the class and has earned that title. He brought the Indiana Hoosiers to an undefeated season and won the heisman while doing so. He has all the physical tools to be a great pro and has a pro level work ethic. Will be a franchise QB if given the right tools around him to succeed.',
  },
  '2': { // Jeremiyah Love
    immediateImpact: 9,
    potential: 10,
    riskLevel: 2,
    playStyleTags: ['Explosive', 'Receiving back', 'Elusive', 'Big play'],
    analysis:
      'Love is the best player in the class. He brings elite versatility with the ability to play as a slot receiver and be an all pro running back. He has elite footwork, prolific burst and can take any play to the crib. He has the potential to be a top five back by his second/third season.',
  },
  '3': { // Rueben Bain Jr.
    immediateImpact: 8,
    potential: 10,
    riskLevel: 4,
    playStyleTags: ['Versatile', 'High motor', 'Pass rush', 'Run stopper'],
    analysis:
      'I am not as concerned about Bain\'s arm length as some other seem to be. He dominated with his "short" arms consistently and shined throughout the CFP. He is a strong power rusher with inside-outside versatility. Think he will be a stud.',
  },
  '4': { // Caleb Downs
    immediateImpact: 9,
    potential: 10,
    riskLevel: 3,
    playStyleTags: ['Box safety', 'Leader', 'Tackler', 'Versatile'],
    analysis:
      'Downs has been one of the top defenders in college football since he was a freshman at Alabama for Nick Saban. He has been the best player on three different defensive schemes and is a natural leader who defensive coordinators can rely on. He will thrive as a box safety and will instantly help a defense. Led his team to a National Championship and is a winner.',
  },
  '5': { // Sonny Styles
    immediateImpact: 8,
    potential: 10,
    riskLevel: 3,
    playStyleTags: ['Former safety', 'Tackler', 'Coverage', 'Physical'],
    analysis:
      'No player upped their stock more than Sonny Styles. He lit up the combine with the fastest 40-yard dash for linebackers, running a 4.46 at 6\'5\", 244 lbs. He is a converted safety who only missed one tackle all season last year. He fills gaps and makes reads in the run game extremely well. Very smart and can be the leader of a defense at the next level.',
  },
  '6': { // Jordyn Tyson
    immediateImpact: 8,
    potential: 10,
    riskLevel: 6,
    playStyleTags: ['Electric', 'YAC', 'Contested catches', 'Big play'],
    analysis:
      'Tyson is WR1 for me in this class because he offers the most upside. He is super dynamic with the ball in his hands and very strong at the catch point. Anytime Arizona State needed a big play, they went to Tyson and he typically delivered. The major concern is his extensive injury history, but none of the injuries are correlated, which suggests he has mostly been unlucky. If he can stay healthy at the next level, he has true game-breaking potential.',
  },
  '7': { // David Bailey
    immediateImpact: 7,
    potential: 9,
    riskLevel: 4,
    playStyleTags: ['Burst', 'Pass rush', 'Production', 'Upside'],
    analysis:
      'Bailey is an excellent pass rusher and was a key piece of an elite Texas Tech defense last year. As a pure pass rusher, he may be the best in the class, leading the country with 14.5 sacks this season. He wins with burst and leverage off the edge, consistently stressing tackles in space. He is slightly on the lighter side for edge defenders, so there is some concern about how he will hold up in the run game, but the pass-rush impact is real.',
  },
  '8': { // Arvell Reese Jr.
    immediateImpact: 7,
    potential: 9,
    riskLevel: 5,
    playStyleTags: ['Athletic', 'Pass rush', 'Raw', 'Upside'],
    analysis:
      'Reese Jr. is a tough prospect to evaluate. Many project him as a full-time edge in the league, but he logged just 104 pass-rush snaps this season (per PFF) and did not record a sack in the final six games. The flashes are there both as a pass rusher and as an off-ball linebacker, and his versatility jumps off the tape. He can be an excellent chess piece for a defensive coordinator if a staff is patient and clear about his long-term role.',
  },
  '9': { // Makai Lemon
    immediateImpact: 7,
    potential: 8,
    riskLevel: 4,
    playStyleTags: ['Route runner', 'Contested catch', 'Separation', 'Versatile'],
    analysis:
      'Lemon is excellent at finding a defender\'s blind spot and using it to create space. He is a fluid route runner who can really win at the catch point, especially for his size. Because of his frame, he will most likely be a full-time slot, but we have seen how slot receivers can dominate in today\'s NFL.',
  },
  '10': { // Francis Mauigoa
    immediateImpact: 8,
    potential: 9,
    riskLevel: 3,
    playStyleTags: ['Mauler', 'Pass pro', 'Run blocker', 'OT1'],
    analysis:
      'Francis is my OT1 in this class. He clearly has the size and strength to stick at tackle and should be an impact starter right away. He is a mauler in the run game and protected Carson Beck all season, allowing just two sacks all year (per PFF). In my opinion, he is one of the safest picks in this draft.',
  },
  '11': { // Jermod McCoy
    immediateImpact: 7,
    potential: 9,
    riskLevel: 7,
    playStyleTags: ['Man coverage', 'Ball skills', 'Athletic', 'Injury concern'],
    analysis:
      'Jermod would be a lot higher on my board had he played football this year. He tore his ACL at the end of last season after putting together a phenomenal year of tape. It is hard to know whether a player can come back from that injury and adjust to the NFL at the same time, but if McCoy returns as the same player, he has the upside to be a true lockdown corner.',
  },
  '12': { // Carnell Tate
    immediateImpact: 8,
    potential: 9,
    riskLevel: 2,
    playStyleTags: ['Route runner', 'Contested catch', 'Complete', 'Pro ready'],
    analysis:
      'Tate has a super high floor. He can run any route and has strong, reliable hands. He does not have true breakaway speed and is not particularly special after the catch, but he is consistently where he needs to be and has WR1 potential. He is set to become the sixth Ohio State receiver taken in the first round in the last five years.',
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
    potential: 9,
    riskLevel: 4,
    playStyleTags: ['Man corner', 'Technique', 'Physical', 'Coverage'],
    analysis:
      'Delane locked down SEC receivers with sound technique and toughness. He transferred well and filled a major need. He can start outside and contribute in press-man schemes.',
  },
  '15': { // Spencer Fano
    immediateImpact: 7,
    potential: 8,
    riskLevel: 3,
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
    immediateImpact: 7,
    potential: 9,
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
