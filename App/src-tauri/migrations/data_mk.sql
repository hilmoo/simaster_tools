CREATE TABLE
    data_MK (
        No INTEGER PRIMARY KEY,
        MK TEXT NOT NULL,
        SKS INTEGER DEFAULT 0,
        Sem INTEGER DEFAULT 0,
        Prasyarat TEXT DEFAULT '',
        Dosen TEXT DEFAULT '',
        Jadwal TEXT DEFAULT ''
    );

CREATE TABLE
    selected_MK (
        kode INTEGER PRIMARY KEY UNIQUE,
        senin INTEGER DEFAULT NULL,
        selasa INTEGER DEFAULT NULL,
        rabu INTEGER DEFAULT NULL,
        kamis INTEGER DEFAULT NULL,
        jumat INTEGER DEFAULT NULL,
        sabtu INTEGER DEFAULT NULL
    );