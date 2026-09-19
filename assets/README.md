# فهرس الأصول — Perfect Vision Website Assets

آخر تنظيم: 7 سبتمبر 2026. كل ملف هنا مستخدم فعليًا في الموقع (تم التحقق آليًا) ما لم يُذكر خلاف ذلك.

---

## استراتيجية التسمية / Naming strategy

```
<brand>-<category>-<subject>[-<variant>].<ext>
```

| الجزء | القاعدة | أمثلة |
|---|---|---|
| `brand` | `perfect-vision` لأصول العلامة الأم · `fleetic` لأصول المنصة · `client-logo` لشعارات العملاء · `icon-social` لأيقونات التواصل | `perfect-vision-…`, `fleetic-…` |
| `category` | نوع الصورة: `hero`, `photo`, `news`, `certificate`, `texture`, `mark`/`logo`, اسم المنتج (`proxview`, `airview`…), `alarm`, `platform` | `perfect-vision-hero-…`, `fleetic-alarm-…` |
| `subject` | وصف مختصر بالإنجليزي لما في الصورة، لا اسم المصوّر ولا أرقام | `monitor-front`, `excavator-dusk` |
| `variant` | اختياري: `portrait` / `wide` / `badge` / `white` / `red` / `bw` / `4ch` | `-portrait`, `-badge`, `-bw` |

قواعد ثابتة:
- حروف صغيرة فقط، الفاصل `-`، بدون مسافات أو `_` أو أحرف عربية في أسماء الملفات (لضمان عمل الروابط).
- لا أرقام تسلسلية (`proxview1`) ولا أسماء مصوّرين (`…-unsplash`).
- الاسم يجب أن يبقى مفهومًا إذا حُمّلت الصورة منفردة خارج الموقع: `perfect-vision-proxview-monitor-front.webp` يقول كل شيء.
- المجلد يحدد الفئة، والاسم يكرّرها عمدًا حتى لا يضيع المعنى عند التحميل.

---

## بنية المجلدات / Folder map

```
assets/
├─ brand/          شعارات وعلامة Perfect Vision
├─ heroes/         صور الأغلفة (Hero) لصفحات الموقع
├─ photos/         الفوتوغرافيا الميدانية العامة (مواقع، معدات، عمال)
├─ products/       صور المنتجات، مجلد لكل منتج
│  ├─ proxview/  airview/  fleetview/  trackview/  shared/
│  └─ liftview/  helmview/  firesuppression/   ← فارغة، جاهزة للإضافة
├─ fleetic/        كل ما يخص منصة Fleetic
│  ├─ brand/  hero/  alarms/  platform/  packaging/  backgrounds/
├─ clients/        شعارات كبار العملاء (سلايدر "يثق بنا")
├─ certificates/   شهادات ISO (وثيقة + شارة)
├─ news/           صور الأخبار والمقالات
├─ team/           صور الفريق
├─ textures/       خلفيات وأنسجة
└─ social/         أيقونات منصات التواصل
```

الأيقونات الخطية (`icons/*.svg`) خارج `assets/` لأنها تُستدعى ديناميكيًا بالاسم من الكود.

---

## brand/ — علامة Perfect Vision
| الملف | الوصف | الاستخدام |
|---|---|---|
| `perfect-vision-logo-en-white.svg` | الشعار الكامل بالإنجليزي، أبيض | Home |
| `perfect-vision-mark-red.webp` | النجمة (Mark) حمراء | SiteFooter |
| `perfect-vision-mark-white.webp` | النجمة بيضاء | Header, Articles, Footer |
| `perfect-vision-badge.svg` | شارة العلامة | CTA Trail Demo |

## heroes/ — أغلفة الصفحات
| الملف | الوصف | الاستخدام |
|---|---|---|
| `perfect-vision-hero-site-safety.webp` | غلاف سلامة المواقع | Home |
| `perfect-vision-hero-fleet-safety.webp` | غلاف سلامة الأساطيل | Home, FleetView |
| `perfect-vision-hero-worker-safety.webp` | غلاف سلامة العمال | Home |
| `perfect-vision-hero-about-dammam-sails.webp` | كورنيش الدمام، مجسم الأشرعة | About, Newsroom, Articles |
| `perfect-vision-hero-contact.webp` | غلاف صفحتي التواصل والوظائف | Contact, Careers |

## photos/ — الفوتوغرافيا الميدانية
| الملف | الوصف | الاستخدام |
|---|---|---|
| `perfect-vision-photo-excavator.webp` | حفّار في الموقع | Home, Newsroom, Articles, Solutions |
| `perfect-vision-photo-excavator-dusk.webp` | حفّار عند الغسق | ProxView |
| `perfect-vision-photo-excavator-sunrise-ridge.webp` | حفّار على تلة عند الشروق | About, Industries, Solutions |
| `perfect-vision-photo-excavators-demolition.webp` | حفّارات في موقع هدم | About, Industries, Solutions |
| `perfect-vision-photo-earthworks-site.webp` | أعمال حفر وشاحنة قلاب | About, Home, Industries, Solutions |
| `perfect-vision-photo-construction-site-aerial.webp` | موقع إنشاء من الأعلى، رافعات | About, Industries, Solutions |
| `perfect-vision-photo-highrise-site-topdown.webp` | أبراج تحت الإنشاء، لقطة عمودية | About, Industries, Solutions |
| `perfect-vision-photo-megaproject-aerial.webp` | مشروع عملاق، لقطة جوية | About, Industries, Solutions |
| `perfect-vision-photo-rebar-crew-at-height.webp` | عمال حديد تسليح على ارتفاع | About, Industries, Solutions |
| `perfect-vision-photo-worker-harness-formwork.webp` | عامل بحزام أمان على قوالب | About, Industries, Solutions |
| `perfect-vision-photo-crew-gas-plant.webp` | ثلاثة عمال أمام منشأة غاز | About, Industries, Solutions |
| `perfect-vision-photo-petrochemical-plant.webp` | مصفاة بتروكيماويات | About, Industries, Solutions |
| `perfect-vision-photo-foundry-sparks-night.webp` | مسبك وشرر ليلًا | About, Industries, Solutions |
| `perfect-vision-photo-wheel-loader-shore.webp` | لودر على شاطئ | About, Industries, Solutions |
| `perfect-vision-photo-fleet-yard-aerial.webp` | ساحة أسطول من الأعلى | Home, CTA Trail Demo |
| `perfect-vision-photo-fleet-row.webp` | صف شاحنات | Home, Newsroom, Articles, Solutions |
| `perfect-vision-photo-truck-row-bw.webp` | صف شاحنات، أبيض وأسود | Home, CTA Trail Demo |
| `perfect-vision-photo-truck-dust.webp` | شاحنة وغبار | Home, AirView, Articles, Solutions |
| `perfect-vision-photo-loader-night-bw.webp` | لودر ليلًا، أبيض وأسود | Home, Solutions |
| `perfect-vision-photo-driver-cab.webp` | سائق داخل المقصورة | FleetView, ProxView |
| `perfect-vision-photo-cab-interior.webp` | داخل مقصورة الشاحنة | Newsroom, Solutions |
| `perfect-vision-photo-cab-mirror-device.webp` | جهاز على مرآة المقصورة | Newsroom, Solutions |
| `perfect-vision-photo-cab-monitor.webp` | شاشة داخل المقصورة | Newsroom, Solutions |
| `perfect-vision-photo-field-workers.webp` | عمال في الميدان | Newsroom, Articles, Solutions |
| `perfect-vision-photo-worker-column.webp` | عامل، لقطة عمودية | Home, Blogs |
| `perfect-vision-photo-site-steam-crew.webp` | طاقم وسط بخار الموقع | ProxView |
| `perfect-vision-photo-sparks-grinder.webp` | شرر جلخ | AirView |
| `perfect-vision-photo-solar-panels.webp` | ألواح شمسية | AirView |

## products/ — المنتجات
**proxview/**
| الملف | الوصف |
|---|---|
| `perfect-vision-proxview-kit-monitor-cameras-alarm.webp` | الطقم الكامل: شاشة + 4 كاميرات + وحدة إنذار |
| `perfect-vision-proxview-monitor-front.webp` | الشاشة 10.1" من الأمام |
| `perfect-vision-proxview-monitor-back.webp` | الشاشة من الخلف |
| `perfect-vision-proxview-camera-ir.webp` | كاميرا بأشعة تحت الحمراء |
| `perfect-vision-proxview-alarm-unit.webp` | وحدة الإنذار الصوتي والضوئي |
| `perfect-vision-proxview-wiring-diagram.webp` | مخطط التوصيل AV1–AV4 |
| `perfect-vision-proxview-installation-diagram.webp` | مخطط التركيب على المعدة |

**airview/**
| الملف | الوصف |
|---|---|
| `perfect-vision-airview-station-angle.webp` | محطة جودة الهواء، زاوية علوية |
| `perfect-vision-airview-station-front-and-side.webp` | واجهة + جانب |
| `perfect-vision-airview-station-three-quarter.webp` | ثلاثة أرباع |
| `perfect-vision-airview-station-wide-banner.webp` | لقطة عريضة للشرائط |
| `perfect-vision-airview-installation-diagram.webp` | مخطط التركيب |

**fleetview/**
| الملف | الوصف |
|---|---|
| `perfect-vision-fleetview-ai-dashcam.webp` | وحدة داشكام ADAS الذكية |
| `perfect-vision-fleetview-adas-road-camera.webp` | كاميرا الطريق ADAS |
| `perfect-vision-fleetview-dms-driver-camera.webp` | كاميرا السائق DMS |
| `perfect-vision-fleetview-bsd-blind-spot-cameras.webp` | كاميرات النقاط العمياء |
| `perfect-vision-fleetview-in-cabin-camera.webp` | كاميرا المقصورة |
| `perfect-vision-fleetview-mdvr-4ch.webp` | مسجل MDVR أربع قنوات (Plus) |
| `perfect-vision-fleetview-mdvr-8ch.webp` | مسجل MDVR ثماني قنوات (Max) |
| `perfect-vision-fleetview-mdvr-camera-kit.webp` | MDVR مع طقم الكاميرات |

**trackview/**
| الملف | الوصف |
|---|---|
| `perfect-vision-trackview-unit.jpg` | وحدة TrackView |
| `perfect-vision-trackview-plus-unit.jpg` | وحدة TrackView Plus |
| `perfect-vision-trackview-highway-scene.webp` | مشهد طريق سريع |

**shared/**
| الملف | الوصف |
|---|---|
| `perfect-vision-monitor-display-7in.webp` | شاشة 7" بشعار Perfect Vision (Home, Newsroom, Blogs) |

`liftview/`, `helmview/`, `firesuppression/` فارغة (فيها `.gitkeep` فقط). أضف الصور بنفس النمط: `perfect-vision-liftview-<subject>.webp`.

## fleetic/ — منصة Fleetic
**brand/**: `fleetic-logo-full-white.svg`, `fleetic-logo-color.webp`, `fleetic-logo-white.webp`, `fleetic-mark-blue.svg`, `fleetic-mark.svg` (احتياطي، غير مستخدم حاليًا), `fleetic-menu-thumbnail.webp` (صورة القائمة في الهيدر).

**hero/**: `fleetic-hero-fleet-silhouette.webp` (غلاف صفحة Fleetic), `fleetic-hero-truck-silhouette-blue.webp` (Home, Newsroom).

**alarms/** — لقطات إنذارات حقيقية من كاميرات مركّبة (صفحة Fleetic):
`fleetic-alarm-forward-collision`, `-lane-departure`, `-too-close-distance`, `-pedestrian-detection`, `-fatigue-driving`, `-distracted-driving`, `-phone-use`, `-smoking`, `-ir-blocking-sunglasses`, `-seat-belt`, `-driver-abnormal` (كلها `.jpg`).

**platform/** — لقطات واجهة المنصة (صفحة Fleetic):
`fleetic-platform-dashboard`, `-live-map`, `-track-playback`, `-geo-fence`, `-alarm-report`, `-mileage-calendar`, `-airview-data-analysis` (كلها `.webp`).

**packaging/**: `fleetic-packaging-powered-by-boxes.webp` — علب "Powered by Fleetic".
**backgrounds/**: `fleetic-background-blue-drape.webp` — خلفية زرقاء تُستخدم في بطاقات Fleetic عبر الموقع.

## clients/ — شعارات العملاء
PNG بخلفية شفافة، مقصوصة من الفراغ. قيمة `scale` لموازنة الأحجام موجودة في مصفوفة `clients` داخل Home/About/Fleetic، لا في اسم الملف.
`client-logo-neom`, `-qiddiya`, `-sabic`, `-saudi-aramco`, `-maaden`, `-jeddah-central`, `-new-murabba`, `-rcjy`, `-sadara`, `-saudi-energy`.

## certificates/ — شهادات ISO
لكل شهادة ملفان: الوثيقة `perfect-vision-certificate-iso-<رقم>.<ext>` والشارة `…-badge.jpg`.
ISO 9001 · 45001 · 14001 · 27001، بالإضافة إلى شهادة المحتوى المحلي: `perfect-vision-certificate-local-content.webp` / `-badge.webp` (هيئة المحتوى المحلي والمشتريات الحكومية، صالحة حتى 31/07/2027)، وبراءة الاختراع SA 24047: `perfect-vision-certificate-patent-saip.webp` / `-badge.webp` (الهيئة السعودية للملكية الفكرية، نظام التحذير والإنذار من الاقتراب القائم على الذكاء الاصطناعي). تُستدعى ديناميكيًا في About.dc.html (مصفوفتا `certImgs` و`certDocs`).

## news/ — الأخبار
`perfect-vision-news-brand-launch-portrait.webp` (مقال إطلاق الهوية)، `perfect-vision-news-iso-certification-portrait.webp` (مقال شهادات ISO).

## team/
`perfect-vision-ceo-portrait.webp` — صورة الرئيس التنفيذي (News Block Options).

## textures/
`perfect-vision-texture-night-sky-stars.webp`, `perfect-vision-texture-rain-drops.webp` (ProxView).

## social/
`icon-social-linkedin.svg`, `icon-social-x.svg`, `icon-social-instagram.svg`, `icon-social-youtube.svg` (Footer, Contact).

---

## عند إضافة صورة جديدة
1. اختر المجلد حسب الفئة (وليس حسب الصفحة).
2. سمِّها بالنمط: `<brand>-<category>-<subject>[-<variant>].<ext>`.
3. فضّل `webp` للصور الفوتوغرافية والمنتجات، `svg` للشعارات والأيقونات، `png` عند الحاجة للشفافية.
4. أضف سطرًا لها في هذا الفهرس.
