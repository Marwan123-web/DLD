import { Injectable } from '@angular/core';
import { LeaderProfile } from '../models/leader-profile.model';

// TODO(backend): Replace with DLD Leadership API response.
const MOCK_LEADERS: LeaderProfile[] = [
  {
    id: '1',
    name: 'H.E. Sultan Butti Bin Mejren',
    nameAr: 'سعادة سلطان بطي بن مجرن',
    title: 'Director General',
    titleAr: 'المدير العام',
    photoUrl: 'assets/images/leader-placeholder.jpg',
    messageExcerpt:
      "Dubai Land Department continues to lead the development of the real estate sector, fostering a transparent, innovative, and sustainable ecosystem that reinforces Dubai's position as a global property investment destination.",
    messageExcerptAr:
      'تواصل دائرة الأراضي والأملاك دبي قيادة تطوير قطاع العقارات، وتعزيز منظومة شفافة ومبتكرة ومستدامة تعزز مكانة دبي وجهةً عالمية للاستثمار العقاري.',
  },
  {
    id: '2',
    name: 'H.E. Ali Abdullah Al Ali',
    nameAr: 'سعادة علي عبدالله العلي',
    title: 'Deputy Director General',
    titleAr: 'نائب المدير العام',
    photoUrl: 'assets/images/leader-placeholder.jpg',
    messageExcerpt:
      'Our commitment to digital transformation and smart government services drives us to continuously improve the experience for all stakeholders—from first-time buyers to seasoned investors.',
    messageExcerptAr:
      'يدفعنا التزامنا بالتحول الرقمي وخدمات الحكومة الذكية إلى تحسين تجربة جميع أصحاب المصلحة باستمرار، من المشترين لأول مرة إلى المستثمرين المتمرسين.',
  },
  {
    id: '3',
    name: 'H.E. Marwan Ahmad Bin Ghalita',
    nameAr: 'سعادة مروان أحمد بن غليطة',
    title: 'CEO, Real Estate Regulatory Agency',
    titleAr: 'الرئيس التنفيذي، مؤسسة التنظيم العقاري',
    photoUrl: 'assets/images/leader-placeholder.jpg',
    messageExcerpt:
      'Through RERA, we safeguard the rights of all real estate parties and uphold the highest regulatory standards, making Dubai one of the most trusted real estate markets worldwide.',
    messageExcerptAr:
      'من خلال مؤسسة التنظيم العقاري، نحمي حقوق جميع أطراف العقار ونحافظ على أعلى معايير التنظيم، مما يجعل دبي من أكثر أسواق العقارات موثوقية على مستوى العالم.',
  },
];

@Injectable({ providedIn: 'root' })
export class LeadersService {
  getAll(): LeaderProfile[] {
    return MOCK_LEADERS;
  }
}
