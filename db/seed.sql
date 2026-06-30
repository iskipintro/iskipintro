-- Sample data for iSkipIntro

-- Movies
INSERT INTO movies (tmdb_id, title, year, poster, backdrop) VALUES
  (680, 'Pulp Fiction', 1994, '/pulp-fiction-poster.jpg', '/pulp-fiction-backdrop.jpg'),
  (238, 'The Godfather', 1972, '/godfather-poster.jpg', '/godfather-backdrop.jpg'),
  (155, 'The Dark Knight', 2008, '/dark-knight-poster.jpg', '/dark-knight-backdrop.jpg'),
  (11, 'Star Wars', 1977, '/star-wars-poster.jpg', '/star-wars-backdrop.jpg');

-- Series
INSERT INTO series (tmdb_id, title, poster, backdrop) VALUES
  (1396, 'Breaking Bad', '/breaking-bad-poster.jpg', '/breaking-bad-backdrop.jpg'),
  (1668, 'Friends', '/friends-poster.jpg', '/friends-backdrop.jpg'),
  (1429, 'Attack on Titan', '/aot-poster.jpg', '/aot-backdrop.jpg'),
  (1399, 'Game of Thrones', '/got-poster.jpg', '/got-backdrop.jpg');

-- Seasons (Breaking Bad has 5 seasons)
INSERT INTO seasons (series_id, season_number) VALUES
  (1, 1), (1, 2), (1, 3), (1, 4), (1, 5);

-- Seasons (Friends has 10 seasons)
INSERT INTO seasons (series_id, season_number) VALUES
  (2, 1), (2, 2), (2, 3), (2, 4), (2, 5),
  (2, 6), (2, 7), (2, 8), (2, 9), (2, 10);

-- Seasons (AOT has 4 seasons)
INSERT INTO seasons (series_id, season_number) VALUES
  (3, 1), (3, 2), (3, 3), (3, 4);

-- Seasons (GoT has 8 seasons)
INSERT INTO seasons (series_id, season_number) VALUES
  (4, 1), (4, 2), (4, 3), (4, 4), (4, 5),
  (4, 6), (4, 7), (4, 8);

-- Episodes for Breaking Bad S1 (season_id = 1)
INSERT INTO episodes (season_id, episode_number, tmdb_episode_id, title, runtime, air_date) VALUES
  (1, 1, 62085, 'Pilot', 58, '2008-01-20'),
  (1, 2, 62086, 'Cat''s in the Bag...', 48, '2008-01-27'),
  (1, 3, 62087, '...And the Bag''s in the River', 48, '2008-02-10'),
  (1, 4, 62088, 'Cancer Man', 48, '2008-02-17'),
  (1, 5, 62089, 'Gray Matter', 48, '2008-02-24'),
  (1, 6, 62090, 'Crazy Handful of Nothin''', 48, '2008-03-02'),
  (1, 7, 62091, 'A No-Rough-Stuff-Type Deal', 48, '2008-03-09');

-- Episodes for Breaking Bad S2 (season_id = 2)
INSERT INTO episodes (season_id, episode_number, tmdb_episode_id, title, runtime, air_date) VALUES
  (2, 1, 62092, 'Seven Thirty-Seven', 48, '2009-03-08'),
  (2, 2, 62093, 'Grilled', 48, '2009-03-15'),
  (2, 3, 62094, 'Bit by a Dead Bee', 48, '2009-03-22');

-- Episodes for Friends S1 (season_id = 6)
INSERT INTO episodes (season_id, episode_number, tmdb_episode_id, title, runtime, air_date) VALUES
  (6, 1, 62000, 'The Pilot', 23, '1994-09-22'),
  (6, 2, 62001, 'The One with the Sonogram at the End', 23, '1994-09-29');

-- Episodes for AOT S1 (season_id = 16)
INSERT INTO episodes (season_id, episode_number, tmdb_episode_id, title, runtime, air_date) VALUES
  (16, 1, 63000, 'To You, in 2000 Years: The Fall of Shiganshina', 24, '2013-04-07'),
  (16, 2, 63001, 'That Day: The Fall of Shiganshina (Part 2)', 24, '2013-04-14');

-- Episodes for GoT S1 (season_id = 20)
INSERT INTO episodes (season_id, episode_number, tmdb_episode_id, title, runtime, air_date) VALUES
  (20, 1, 64000, 'Winter Is Coming', 62, '2011-04-17'),
  (20, 2, 64001, 'The Kingsroad', 56, '2011-04-24');

-- Markers for Breaking Bad S1E1 (episode_id = 1)
INSERT INTO markers (episode_id, type, start_time, end_time, confidence, verified) VALUES
  (1, 'RECAP', 0, 90, 0.98, 1),
  (1, 'INTRO', 90, 132.4, 0.99, 1),
  (1, 'CREDITS', 3021, 3101, 0.95, 1);

-- Markers for Breaking Bad S1E2 (episode_id = 2)
INSERT INTO markers (episode_id, type, start_time, end_time, confidence, verified) VALUES
  (2, 'RECAP', 0, 70, 0.97, 1),
  (2, 'INTRO', 70, 112, 0.99, 1),
  (2, 'CREDITS', 2880, 2960, 0.95, 1);

-- Markers for Breaking Bad S1E3 (episode_id = 3)
INSERT INTO markers (episode_id, type, start_time, end_time, confidence, verified) VALUES
  (3, 'RECAP', 0, 65, 0.97, 1),
  (3, 'INTRO', 65, 108, 0.99, 1),
  (3, 'CREDITS', 2880, 2950, 0.95, 1);

-- Markers for Friends S1E1 (episode_id = 8)
INSERT INTO markers (episode_id, type, start_time, end_time, confidence, verified) VALUES
  (8, 'INTRO', 0, 60, 0.99, 1),
  (8, 'CREDITS', 1350, 1400, 0.95, 1);

-- Markers for AOT S1E1 (episode_id = 10)
INSERT INTO markers (episode_id, type, start_time, end_time, confidence, verified) VALUES
  (10, 'RECAP', 0, 30, 0.90, 1),
  (10, 'OPENING', 30, 90, 0.99, 1),
  (10, 'ENDING', 1380, 1420, 0.98, 1);

-- Markers for GoT S1E1 (episode_id = 12)
INSERT INTO markers (episode_id, type, start_time, end_time, confidence, verified) VALUES
  (12, 'RECAP', 0, 120, 0.85, 1),
  (12, 'INTRO', 120, 195, 0.99, 1),
  (12, 'CREDITS', 3600, 3720, 0.95, 1);
