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
  '1': {
    immediateImpact: 8,
    potential: 9,
    riskLevel: 4,
    playStyleTags: ['Polished', 'Pocket passer', 'Arm talent', 'Decision maker'],
    analysis:
      'Mendoza is the most pro-ready quarterback in this class with excellent footwork and anticipation. He reads defenses quickly and delivers with accuracy from the pocket. His ceiling is that of a franchise cornerstone if he continues to develop his deep-ball consistency.',
  },
  '2': {
    immediateImpact: 7,
    potential: 9,
    riskLevel: 5,
    playStyleTags: ['Explosive', 'Receiving back', 'Elusive', 'Big play'],
    analysis:
      'Love brings elite burst and home-run ability every time he touches the ball. He can contribute immediately as a change-of-pace back and pass catcher. With refinement in pass protection, he has three-down workhorse potential.',
  },
  '3': {
    immediateImpact: 8,
    potential: 9,
    riskLevel: 5,
    playStyleTags: ['Versatile', 'High motor', 'Pass rush', 'Run stopper'],
    analysis:
      'Bain has inside-outside versatility and disrupts every down with his relentless pursuit. He wins with burst and technique, and his motor never stops. He projects as an impact defender from day one with Pro Bowl upside.',
  },
  '4': {
    immediateImpact: 9,
    potential: 9,
    riskLevel: 3,
    playStyleTags: ['Box safety', 'Leader', 'Tackler', 'Versatile'],
    analysis:
      'Downs has been elite since his freshman year and brings rare intangibles to a defensive backfield. He excels in the box and can matchup in coverage. His leadership and football IQ make him a culture-setter for any franchise.',
  },
  '5': {
    immediateImpact: 7,
    potential: 9,
    riskLevel: 4,
    playStyleTags: ['Former safety', 'Tackler', 'Coverage', 'Physical'],
    analysis:
      'Styles converted from safety and became one of the best tacklers in college football with almost no misses. He flows to the ball naturally and brings an enforcer mentality. His coverage will only improve with more reps.',
  },
  '6': {
    immediateImpact: 6,
    potential: 10,
    riskLevel: 6,
    playStyleTags: ['Electric', 'YAC', 'Contested catches', 'Big play'],
    analysis:
      'Tyson has the highest ceiling in the receiver class with rare ball skills and after-catch ability. He needs development in route polish but his ceiling is elite. He can be a game-changer in the right scheme.',
  },
  '7': {
    immediateImpact: 6,
    potential: 9,
    riskLevel: 6,
    playStyleTags: ['Burst', 'Pass rush', 'Production', 'Upside'],
    analysis:
      'Bailey led the nation in sacks and wins with explosive get-off. His size raises questions about run defense, but his pass-rush traits are undeniable. A team drafting him is betting on his high ceiling.',
  },
  '8': {
    immediateImpact: 5,
    potential: 9,
    riskLevel: 7,
    playStyleTags: ['Athletic', 'Pass rush', 'Raw', 'Upside'],
    analysis:
      'Reese has elite athleticism and started the season strong before fading. His first season as a full-time edge means his best football is ahead. He is a high-risk, high-reward development prospect.',
  },
  '9': {
    immediateImpact: 7,
    potential: 8,
    riskLevel: 4,
    playStyleTags: ['Route runner', 'Contested catch', 'Separation', 'Versatile'],
    analysis:
      'Lemon has the highest floor among receivers with clean routes and reliable hands. He can win at all levels and contributes on day one. His ceiling may be capped but he is a safe, productive pick.',
  },
  '10': {
    immediateImpact: 8,
    potential: 9,
    riskLevel: 3,
    playStyleTags: ['Mauler', 'Pass pro', 'Run blocker', 'OT1'],
    analysis:
      'Mauigoa is the top tackle in the class with rare power in the run game. He rarely allows pressures and has the feet to stay at tackle. He is a day-one starter with All-Pro potential.',
  },
  '11': {
    immediateImpact: 5,
    potential: 9,
    riskLevel: 7,
    playStyleTags: ['Man coverage', 'Ball skills', 'Athletic', 'Injury concern'],
    analysis:
      'McCoy missed the season with injury but his 2024 tape was exceptional. He has shutdown potential with fluid movement and ball skills. The medical evaluation will dictate his draft slot.',
  },
  '12': {
    immediateImpact: 7,
    potential: 9,
    riskLevel: 4,
    playStyleTags: ['Route runner', 'Contested catch', 'Complete', 'Pro ready'],
    analysis:
      'Tate runs every route at a high level and wins contested situations. He has the size and polish to contribute immediately. His ceiling is that of a true WR1 in the right offense.',
  },
  '13': {
    immediateImpact: 8,
    potential: 9,
    riskLevel: 3,
    playStyleTags: ['Mauler', 'Interior', 'Pass pro', 'Day one starter'],
    analysis:
      'Ioane is the best interior lineman in the class and moves people at will. He allowed zero sacks and is ready to start immediately. He will anchor an offensive line for years.',
  },
  '14': {
    immediateImpact: 7,
    potential: 8,
    riskLevel: 4,
    playStyleTags: ['Man corner', 'Technique', 'Physical', 'Coverage'],
    analysis:
      'Delane locked down SEC receivers with sound technique and toughness. He transferred well and filled a major need. He can start outside and contribute in press-man schemes.',
  },
  '15': {
    immediateImpact: 7,
    potential: 8,
    riskLevel: 4,
    playStyleTags: ['Versatile', 'Run blocker', 'Pass pro', 'Guard-tackle'],
    analysis:
      'Fano offers position flexibility and can play tackle or kick inside. He is a mauler in the run game with improving pass protection. He provides immediate depth with starter upside.',
  },
  '16': {
    immediateImpact: 6,
    potential: 8,
    riskLevel: 5,
    playStyleTags: ['Size', 'Pass rush', 'Run defense', 'Upside'],
    analysis:
      'McDonald dominated the Senior Bowl and has rare size for his position. He offers both pass and run value. He is still developing but has huge upside based on his frame.',
  },
  '17': {
    immediateImpact: 6,
    potential: 8,
    riskLevel: 5,
    playStyleTags: ['Versatile', 'Pass rush', 'Run defense', 'Upside'],
    analysis:
      'Woods looked like a first-rounder as a freshman but slipped after a down year. He offers upside in both phases. A team drafting him is betting on the traits he showed earlier.',
  },
  '18': {
    immediateImpact: 7,
    potential: 8,
    riskLevel: 5,
    playStyleTags: ['Physical', 'Technique', 'Ball skills', 'Undersized'],
    analysis:
      'Terrell plays bigger than his size with elite technique and five forced fumbles. He has mastered the peanut punch. His lack of ideal length is the main concern.',
  },
  '19': {
    immediateImpact: 6,
    potential: 8,
    riskLevel: 5,
    playStyleTags: ['Size', 'Pass rush', 'Run stopper', 'Upside'],
    analysis:
      'Banks has dominant physical traits and can impact both phases. He needs consistency but the upside is significant. He can be a disruptive force with proper development.',
  },
  '20': {
    immediateImpact: 6,
    potential: 8,
    riskLevel: 5,
    playStyleTags: ['Size', 'Upside', 'Limited sample', 'Tackle'],
    analysis:
      'Freeling has limited starts but showed real promise this season. His frame is ideal for tackle and he has been climbing boards. He could develop into a cornerstone lineman.',
  },
  '21': {
    immediateImpact: 6,
    potential: 8,
    riskLevel: 5,
    playStyleTags: ['Versatile', 'Physical', 'Tackler', 'Size'],
    analysis:
      'McNeil-Warren brings size and versatility to the secondary. He plays mean and causes turnovers. Small-school background raises competition questions but the tape speaks.',
  },
  '22': {
    immediateImpact: 7,
    potential: 8,
    riskLevel: 4,
    playStyleTags: ['Tackler', 'Run defense', 'Leadership', 'Scheme fit'],
    analysis:
      'Allen led a pro-style Georgia defense and is an elite run defender. His coverage can improve but he has no problem transitioning. He is a safe, productive linebacker.',
  },
  '23': {
    immediateImpact: 6,
    potential: 9,
    riskLevel: 6,
    playStyleTags: ['Size', 'Upside', 'Pass pro', 'Raw'],
    analysis:
      'Proctor has rare size and can be dominant when he plays to it. He needs to strengthen his base and consistency. If he puts it together, he is a franchise tackle.',
  },
  '24': {
    immediateImpact: 7,
    potential: 8,
    riskLevel: 4,
    playStyleTags: ['Pass rush', 'Run stopper', 'Motor', 'Complete'],
    analysis:
      'Hunter is a well-rounded defensive tackle who affects both phases. He wins with technique and effort. He can start early and grow into a key piece.',
  },
  '25': {
    immediateImpact: 6,
    potential: 8,
    riskLevel: 5,
    playStyleTags: ['Every down', 'Pass rush', 'Run defense', 'Versatile'],
    analysis:
      'Parker did not have the year many hoped but the traits remain. He can play every down and impact run and pass. His development curve will determine his ceiling.',
  },
};

// Default profile for prospects not in the map above (e.g. 26–50)
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
