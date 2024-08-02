interface dataMK {
  Kode: number;
  Nama: string;
  Kelas: string;
}

interface dataJadwal {
  Hari: string;
  Jam: string;
  KodeJam: number;
}

export interface jsonDataRawExt {
  No: string;
  MK: string;
  SKS: string;
  Sem: string;
  Prasyarat: string;
  Dosen: string;
  Jadwal: string;
}

export interface jsonDataClear {
  No: number;
  MK: dataMK;
  SKS: number;
  Sem: number;
  Prasyarat: string;
  Dosen: string[];
  Jadwal: dataJadwal;
}

export interface selectMKHari {
  kode: number;
  senin?: number;
  selasa?: number;
  rabu?: number;
  kamis?: number;
  jumat?: number;
  sabtu?: number;
}
