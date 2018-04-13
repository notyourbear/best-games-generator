const systems = {
  portable: [
    {
      releaseDates: ['1989','1995'],
      systems: ['Game Boy', 'Game Gear', 'Atari Lynx', 'TurboExpress']
    },
    {
      releaseDates: ['1995','2002'],
      systems: ['NOMAD', 'Game Boy Color', 'Neo Geo Pocket', 'WonderSwan']
    },
    {
      releaseDates: ['2001','2005'],
      systems: ['Game Boy Advance', 'N-Gage']
    },
    {
      releaseDates: ['2004', '2012'],
      systems: ['Nintendo DS', 'PSP']
    },
    {
      releaseDates: ['2011','2018'],
      systems: ['Nintendo 3DS', 'Vita']
    },
    {
      releaseDates: ['2017','2018'],
      systems: ['Switch']
    }
  ],
  console: [
    {
      systems: ['NES', 'Master System', 'Atari 7800', 'Atari XEGS'],
      releaseDates: ['1985','1990'],
    },
    {
      systems: ['TurboGrafx-16', 'Genesis', 'Neo Geo', 'Super NES', 'Sega CD', 'LaserActive'],
      releaseDates: ['1989','1995'],
    },
    {
      systems: ['3DO', 'Jaguar', 'Saturn', 'PlayStation', 'N64'],
      releaseDates: ['1993','1998'],
    },
    {
      systems: ['Dreamcast', 'Playstation 2', 'GameCube', 'Xbox'],
      releaseDates: ['1998','2007'],
    },
    {
      systems: ['Xbox 360', 'Playstation 3', 'Wii'],
      releaseDates: ['2005','2014'],
    },
    {
      systems: ['Wii U', 'Playstation 4', 'Xbox One', 'Nintendo Switch'],
      releaseDates: ['2014','2018'],
    }
  ],
  mobile: [
    {
      systems: ['iOS', 'Android'],
      releaseDates: ['2008','2018']
    }
  ],
  pc: [
    {
      systems: ['PC', 'Mac'],
      releaseDates: ['1980','2018']
    }
  ]
};

export default systems;
