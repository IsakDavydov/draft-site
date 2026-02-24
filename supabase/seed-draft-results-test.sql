-- Optional: Seed draft_results with mock data for TESTING the leaderboard.
-- Run this only when you want to preview scoring before the real draft.
-- For production: leave draft_results empty until you add real draft results.

delete from public.draft_results where draft_year = 2026;

insert into public.draft_results (draft_year, pick_number, prospect_id, prospect_name, team) values
(2026, 1, '1', 'Fernando Mendoza', 'Las Vegas Raiders'),
(2026, 2, '8', 'Arvell Reese Jr.', 'New York Jets'),
(2026, 3, '10', 'Francis Mauigoa', 'Arizona Cardinals'),
(2026, 4, '3', 'Rueben Bain Jr.', 'Tennessee Titans'),
(2026, 5, '4', 'Caleb Downs', 'New York Giants'),
(2026, 6, '15', 'Spencer Fano', 'Cleveland Browns'),
(2026, 7, '7', 'David Bailey', 'Washington Commanders'),
(2026, 8, '6', 'Jordyn Tyson', 'New Orleans Saints'),
(2026, 9, '2', 'Jeremiyah Love', 'Kansas City Chiefs'),
(2026, 10, '5', 'Sonny Styles', 'Cincinnati Bengals'),
(2026, 11, '11', 'Jermod McCoy', 'Miami Dolphins'),
(2026, 12, '14', 'Mansoor Delane', 'Dallas Cowboys'),
(2026, 13, '9', 'Makai Lemon', 'Los Angeles Rams'),
(2026, 14, '13', 'Olaivavega Ioane', 'Baltimore Ravens'),
(2026, 15, '34', 'Cashius Howell', 'Tampa Bay Buccaneers'),
(2026, 16, '12', 'Carnell Tate', 'New York Jets'),
(2026, 17, '17', 'Peter Woods', 'Detroit Lions'),
(2026, 18, '22', 'Emmanuel McNeil-Warren', 'Minnesota Vikings'),
(2026, 19, '23', 'CJ Allen', 'Carolina Panthers'),
(2026, 20, '16', 'Kayden McDonald', 'Dallas Cowboys'),
(2026, 21, '32', 'Ty Simpson', 'Pittsburgh Steelers'),
(2026, 22, '26', 'Keldric Faulk', 'Los Angeles Chargers'),
(2026, 23, '20', 'Monroe Freeling', 'Philadelphia Eagles'),
(2026, 24, '28', 'KC Concepcion', 'Cleveland Browns'),
(2026, 25, '25', 'T.J. Parker', 'Chicago Bears'),
(2026, 26, '30', 'Denzel Boston', 'Buffalo Bills'),
(2026, 27, '33', 'Emmanuel Pregnon', 'San Francisco 49ers'),
(2026, 28, '24', 'Kadyn Proctor', 'Houston Texans'),
(2026, 29, '18', 'Avieon Terrell', 'Los Angeles Rams'),
(2026, 30, '27', 'Kenyon Sadiq', 'Denver Broncos'),
(2026, 31, '29', 'Caleb Lomu', 'New England Patriots'),
(2026, 32, '21', 'Lee Hunter', 'Seattle Seahawks');
