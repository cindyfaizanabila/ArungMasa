import { UserProfile } from '../types';
export const ASSET_IMAGES = {
  logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPG9N2_CAvQlZxCjEsEWycXbQmvw-yCzVsqOwP18g6hgLVAP-GBBdn6924p6XBWn6hsgU8tUh66VgWvTRcGGQI1EAB7w56YOsQQq2MYp1EmGQ1uVR5KeT_rVcb6_UG2rlONjWRN8WSjqCEjb6OLGSsjOIx0jJRXQRqch-Mk3eFbDGmTSwJ4F-rn14rcXpNGx1SKSd0EEcglB00hBIxPHoVghoqsQ5UWjbNfRszG5pbatd3VXIddk-s0g',
  registerHero:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBcxTZCjoRJhTtDgFv1PTXRhMA97ji0dTvTjWjpSOLoSNyojRbaJKiWkqECn8ea_sZglKI3aUwAJlI90Eab-o2v3TEn4_qQpxkrgVAztRos_SRNY_2_WvbjJECgTAZZX1ap1ZeC41TzVUdiO0RCl65JR4uDTsuatwuQN1kGYAzrWYu7L6D71TZYZgN2vOqyYZ52gfiZAYOV5wheQ0-rBzgzVldnXtFAUQGV_WXv9WJFbqyNDODaOEE1Dg',
  dianaAvatar:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuC1AMSp0CH553qXyxoE-TkMxz-NeWmTzH3CUijW7uJr8-aQUHEu2Hi4w7nTiPQhILOHjZUEWpcoOH52kb4Lq5S0YpeKfQuZNs1cUQvH4iLkfKi310JaOaOX-NtgglEfbPNm0WRdf1vAEwZRi7UdQD54-5GNqyyNwQCx7RzjzSeFv0J-_6rQO0SoZp41gqVzeIO92MVW0ChSZ2bA15jfnzVOlKcK94bRnF4QsGHcePGvmcKXMM6VpClewA',
};

export const INITIAL_USER: UserProfile = {
  name: 'Diana Kartika',
  nisn: '0072918402',
  school: 'SMAN 1 Jakarta',
  grade: 'Kelas 11',
  registrationCode: 'REG. 1945-JKT',
  avatarUrl: ASSET_IMAGES.dianaAvatar,
  rank: 'Madya',
  isVerifiedBelajarId: true,
  dailyTargetMinutes: 10,
  reminderEnabled: true,
  reminderTime: '19.30 WIB',
};

