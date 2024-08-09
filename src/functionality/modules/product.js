const actualDOM = () => {
  return {
    product: document.querySelector('#product'),
  }
}

const SOFAS = {
  images: [
    //-------------------------ПРЯМІ-----------------------------
    ["/public/images/p1_1.jpg", "/src/assets/images/straight sofas/p1_2.jpg", "/src/assets/images/straight sofas/p1_3.jpg"],
    ["/public/images/p2_1.jpg", "/src/assets/images/straight sofas/p2_2.jpg", "/src/assets/images/straight sofas/p2_3.jpg"],
    ["/public/images/p3_1.jpg", "/src/assets/images/straight sofas/p3_2.jpg", "/src/assets/images/straight sofas/p3_3.jpg"],
    ["/public/images/p4_1.jpg", "/src/assets/images/straight sofas/p4_2.jpg", "/src/assets/images/straight sofas/p4_3.jpg"],
    ["/public/images/p5_1.jpg", "/src/assets/images/straight sofas/p5_3.jpg"],
    ["/public/images/p6_1.jpg", "/src/assets/images/straight sofas/p6_2.jpg", "/src/assets/images/straight sofas/p6_3.jpg"],
    ["/public/images/p7_1.jpg", "/src/assets/images/straight sofas/p7_2.jpg", "/src/assets/images/straight sofas/p7_3.jpg"],
    ["/public/images/p8_1.jpg", "/src/assets/images/straight sofas/p8_2.jpg", "/src/assets/images/straight sofas/p8_3.jpg"],
    ["/public/images/p9_1.jpg", "/src/assets/images/straight sofas/p9_2.jpg"],
    ["/public/images/p10_1.jpg", "/src/assets/images/straight sofas/p10_2.jpg", "/src/assets/images/straight sofas/p10_3.jpg", "/src/assets/images/straight sofas/p10_4.jpg", "/src/assets/images/straight sofas/p10_5.jpg"],

    //-------------------------КУТ-----------------------------
    ["/public/images/k1_1.png", "/src/assets/images/corner sofas/k1_2.jpg", "/src/assets/images/corner sofas/k1_3.jpg"],
    ["/public/images/k2_1.jpg", "/src/assets/images/corner sofas/k2_2.jpg", "/src/assets/images/corner sofas/k2_3.jpg"],
    ["/public/images/k3_1.jpg", "/src/assets/images/corner sofas/k3_2.jpg", "/src/assets/images/corner sofas/k3_3.jpg", "/src/assets/images/corner sofas/k3_4.jpg", "/src/assets/images/corner sofas/k3_5.jpg"],
    ["/public/images/k4_1.jpg", "/src/assets/images/corner sofas/k4_2.jpg", "/src/assets/images/corner sofas/k4_3.jpg", "/src/assets/images/corner sofas/k4_4.jpg", "/src/assets/images/corner sofas/k4_5.jpg"],
    ["/public/images/k5_1.jpg", "/src/assets/images/corner sofas/k5_2.jpg", "/src/assets/images/corner sofas/k5_3.jpg", "/src/assets/images/corner sofas/k5_4.jpg"],
    ["/public/images/k6_1.jpg", "/src/assets/images/corner sofas/k6_2.jpg", "/src/assets/images/corner sofas/k6_3.jpg", "/src/assets/images/corner sofas/k6_4.jpg", "/src/assets/images/corner sofas/k6_5.jpg", "/src/assets/images/corner sofas/k6_6.jpg", "/src/assets/images/corner sofas/k6_7.jpg"],
    ["/public/images/k7_1.jpg", "/src/assets/images/corner sofas/k7_2.jpg", "/src/assets/images/corner sofas/k7_3.jpg", "/src/assets/images/corner sofas/k7_4.jpg", "/src/assets/images/corner sofas/k7_5.jpg"],

    //-------------------------МОД-----------------------------
    ["/public/images/m1_1.png", "/src/assets/images/modular sofas/m1_2.jpg", "/src/assets/images/modular sofas/m1_3.jpg"],
    ["/public/images/m2_1.jpg", "/src/assets/images/modular sofas/m2_2.jpg", "/src/assets/images/modular sofas/m2_3.jpg"],
    ["/public/images/m3_1.jpg", "/src/assets/images/modular sofas/m3_2.jpg", "/src/assets/images/modular sofas/m3_3.jpg", "/src/assets/images/modular sofas/m3_4.jpg", "/src/assets/images/modular sofas/m3_5.jpg"]

  ],

  ops: [
    //-------------------------ПРЯМІ-----------------------------
    ["/public/images/p1_1.jpg", "В основі дивана «HEAVEN» – надійний механізм трансформації єврокнижка. Ролики з захисним покриттям дозволяють без зайвих зусиль розкладати диван, не пошкоджуючи поверхню підлоги. В дивані є просторий ящик з аераторами (спеціальними отворами для проникнення повітря) для зберігання ваших речей і постільної білизни. На тильній стороні дивана передбачена м'яка планка, обтягнута тканиною – практична деталь, завдяки якій ви не будете притулятися до стіни під час сну. <p>У комплекті йдуть великі диванні подушки в зйомних чохлах на «блискавці» з наповнювачем холлофайбер – синтетичним гіпоалергенним волокном, яке не злежується і зберігає форму подушок довгий час. Наповнювач екологічний, він не горить, не вбирає вологу і запахи. М'які прямокутні підлокітники надають строгий консервативний вигляд.</p> <p>Для збірки нашого дивану вам не потрібні спеціальні навички, інструменти та болти, так як кожен наш диван має функцію швидкої збірки. Ви з легкістю зможете самостійно розібрати, або зібрати диван, що значно полегшить його трансформування</p>", "Прямий диван на двох для щоденного сну"],
    ["/public/images/p2_1.jpg", "В основі дивана «BOSS» – надійний механізм трансформації єврокнижка. Ролики з захисним покриттям дозволяють без зайвих зусиль розкладати диван, не пошкоджуючи поверхню підлоги. В дивані є просторий ящик з аераторами (спеціальними отворами для проникнення повітря) для зберігання ваших речей і постільної білизни. На тильній стороні дивана передбачена м'яка планка, обтягнута тканиною – практична деталь, завдяки якій ви не будете притулятися до стіни під час сну. <p>У комплекті йдуть великі диванні подушки в зйомних чохлах на «блискавці» з наповнювачем холлофайбер – синтетичним гіпоалергенним волокном, яке не злежується і зберігає форму подушок довгий час. Наповнювач екологічний, він не горить, не вбирає вологу і запахи. М'які округлені підлокітники надають затишний домашній вигляд.</p> <p>Для збірки нашого дивану вам не потрібні спеціальні навички, інструменти та болти, так як кожен наш диван має функцію швидкої збірки. Ви з легкістю зможете самостійно розібрати, або зібрати диван, що значно полегшить його трансформування</p>", "Прямий диван на двох для щоденного сну"],
    ["/public/images/p3_1.jpg", "В основі дивана «GREENFIELD» – надійний механізм трансформації єврокнижка. Ролики з захисним покриттям дозволяють без зайвих зусиль розкладати диван, не пошкоджуючи поверхню підлоги. В дивані є просторий ящик з аераторами (спеціальними отворами для проникнення повітря) для зберігання ваших речей і постільної білизни. На тильній стороні дивана передбачена м'яка планка, обтягнута тканиною – практична деталь, завдяки якій ви не будете притулятися до стіни під час сну. <p>У комплекті йдуть великі диванні подушки в зйомних чохлах на «блискавці» з наповнювачем холлофайбер – синтетичним гіпоалергенним волокном, яке не злежується і зберігає форму подушок довгий час. Наповнювач екологічний, він не горить, не вбирає вологу і запахи. М'які округлені підлокітники, що мають шухляду що відкривається.</p> <p>Для збірки нашого дивану вам не потрібні спеціальні навички, інструменти та болти, так як кожен наш диван має функцію швидкої збірки. Ви з легкістю зможете самостійно розібрати, або зібрати диван, що значно полегшить його трансформування</p>", "Прямий диван на двох для щоденного сну"],
    ["/public/images/p4_1.jpg", "В основі дивана «LORD» – надійний механізм трансформації єврокнижка. Ролики з захисним покриттям дозволяють без зайвих зусиль розкладати диван, не пошкоджуючи поверхню підлоги. В дивані є просторий ящик з аераторами (спеціальними отворами для проникнення повітря) для зберігання ваших речей і постільної білизни. На тильній стороні дивана передбачена м'яка планка, обтягнута тканиною – практична деталь, завдяки якій ви не будете притулятися до стіни під час сну. <p>У комплекті йдуть великі диванні подушки в зйомних чохлах на «блискавці» з наповнювачем холлофайбер – синтетичним гіпоалергенним волокном, яке не злежується і зберігає форму подушок довгий час. Наповнювач екологічний, він не горить, не вбирає вологу і запахи. М'які прямокутні підлокітники збільшеного розміру з кантом, який надає розкішного зовнішнього вигляду вигляду.</p> <p>Для збірки нашого дивану вам не потрібні спеціальні навички, інструменти та болти, так як кожен наш диван має функцію швидкої збірки. Ви з легкістю зможете самостійно розібрати, або зібрати диван, що значно полегшить його трансформування</p>", "Прямий диван на двох для щоденного сну"],
    ["/public/images/p5_1.jpg", "В основі дивана «BOSS» – надійний механізм трансформації єврокнижка. Ролики з захисним покриттям дозволяють без зайвих зусиль розкладати диван, не пошкоджуючи поверхню підлоги. В дивані є просторий ящик з аераторами (спеціальними отворами для проникнення повітря) для зберігання ваших речей і постільної білизни. На тильній стороні дивана передбачена м'яка планка, обтягнута тканиною – практична деталь, завдяки якій ви не будете притулятися до стіни під час сну. <p>У комплекті йдуть великі диванні подушки в зйомних чохлах на «блискавці» з наповнювачем холлофайбер – синтетичним гіпоалергенним волокном, яке не злежується і зберігає форму подушок довгий час. Наповнювач екологічний, він не горить, не вбирає вологу і запахи. М'які округлені підлокітники надають затишний домашній вигляд.</p> <p>Для збірки нашого дивану вам не потрібні спеціальні навички, інструменти та болти, так як кожен наш диван має функцію швидкої збірки. Ви з легкістю зможете самостійно розібрати, або зібрати диван, що значно полегшить його трансформування</p>", "Прямий диван на двох для щоденного сну"],
    ["/public/images/p6_1.jpg", "В основі дивана «BLISS» – надійний механізм трансформації єврокнижка. Диван має зменшені габаритні розміри, завдяки вузьким підлокітникам, що мають дерев'яну декоративну накладку. Ролики з захисним покриттям дозволяють без зайвих зусиль розкладати диван, не пошкоджуючи поверхню підлоги. В дивані є просторий ящик з аераторами (спеціальними отворами для проникнення повітря) для зберігання ваших речей і постільної білизни. На тильній стороні дивана передбачена м'яка планка, обтягнута тканиною – практична деталь, завдяки якій ви не будете притулятися до стіни під час сну. <p>У комплекті йдуть великі диванні подушки в зйомних чохлах на «блискавці» з наповнювачем холлофайбер – синтетичним гіпоалергенним волокном, яке не злежується і зберігає форму подушок довгий час. Наповнювач екологічний, він не горить, не вбирає вологу і запахи.</p> <p>Для збірки нашого дивану вам не потрібні спеціальні навички, інструменти та болти, так як кожен наш диван має функцію швидкої збірки. Ви з легкістю зможете самостійно розібрати, або зібрати диван, що значно полегшить його трансформування</p>", "Прямий диван на двох для щоденного сну"],
    ["/public/images/p7_1.jpg", "В основі дивана «GREENFIELD» – надійний механізм трансформації єврокнижка. Ролики з захисним покриттям дозволяють без зайвих зусиль розкладати диван, не пошкоджуючи поверхню підлоги. В дивані є просторий ящик з аераторами (спеціальними отворами для проникнення повітря) для зберігання ваших речей і постільної білизни. На тильній стороні дивана передбачена м'яка планка, обтягнута тканиною – практична деталь, завдяки якій ви не будете притулятися до стіни під час сну. <p>У комплекті йдуть великі диванні подушки в зйомних чохлах на «блискавці» з наповнювачем холлофайбер – синтетичним гіпоалергенним волокном, яке не злежується і зберігає форму подушок довгий час. Наповнювач екологічний, він не горить, не вбирає вологу і запахи. М'які округлені підлокітники, що мають шухляду що відкривається.</p> <p>Для збірки нашого дивану вам не потрібні спеціальні навички, інструменти та болти, так як кожен наш диван має функцію швидкої збірки. Ви з легкістю зможете самостійно розібрати, або зібрати диван, що значно полегшить його трансформування</p>", "Прямий диван на двох для щоденного сну"],
    ["/public/images/p8_1.jpg", "В основі дивана «BOSS» – надійний механізм трансформації єврокнижка. Ролики з захисним покриттям дозволяють без зайвих зусиль розкладати диван, не пошкоджуючи поверхню підлоги. В дивані є просторий ящик з аераторами (спеціальними отворами для проникнення повітря) для зберігання ваших речей і постільної білизни. На тильній стороні дивана передбачена м'яка планка, обтягнута тканиною – практична деталь, завдяки якій ви не будете притулятися до стіни під час сну. <p>У комплекті йдуть великі диванні подушки в зйомних чохлах на «блискавці» з наповнювачем холлофайбер – синтетичним гіпоалергенним волокном, яке не злежується і зберігає форму подушок довгий час. Наповнювач екологічний, він не горить, не вбирає вологу і запахи. М'які округлені підлокітники надають затишний домашній вигляд.</p> <p>Для збірки нашого дивану вам не потрібні спеціальні навички, інструменти та болти, так як кожен наш диван має функцію швидкої збірки. Ви з легкістю зможете самостійно розібрати, або зібрати диван, що значно полегшить його трансформування</p>", "Прямий диван на двох для щоденного сну"],
    ["/public/images/p9_1.jpg", "sdiofghiusdhuigrehuihiugrehiureiuriughuirehiurgiurgeiuhuihrgeiuhriurhg", "Прямий диван на двох для щоденного сну"],
    ["/public/images/p10_1.jpg", "В основі дивана «BOSTON» – надійний механізм трансформації єврокнижка. Ролики з захисним покриттям дозволяють без зайвих зусиль розкладати диван, не пошкоджуючи поверхню підлоги. В дивані є просторий ящик з аераторами (спеціальними отворами для проникнення повітря) для зберігання ваших речей і постільної білизни. На тильній стороні дивана передбачена м'яка планка, обтягнута тканиною – практична деталь, завдяки якій ви не будете притулятися до стіни під час сну. <p>У комплекті йдуть великі диванні подушки в зйомних чохлах на «блискавці» з наповнювачем холлофайбер – синтетичним гіпоалергенним волокном, яке не злежується і зберігає форму подушок довгий час. Наповнювач екологічний, він не горить, не вбирає вологу і запахи. М'які прямокутні підлокітники збільшеної висоти, що дозволяє зручно розташуватися у домашньому затишку під будь яким кутом у зручній позі.</p> <p>Для збірки нашого дивану вам не потрібні спеціальні навички, інструменти та болти, так як кожен наш диван має функцію швидкої збірки. Ви з легкістю зможете самостійно розібрати, або зібрати диван, що значно полегшить його трансформування</p>", "Прямий диван на двох для щоденного сну"],

    //-------------------------КУТ-----------------------------
    ["/public/images/k1_1.png", "Класичний кутовий диван «BENJAMIN» – це звична класика в сучасному виконанні. Прикрашають диван великі диванні подушки з контрастною строчкою і декоративними втяжками. В основі ортопедичного дивана – надійний механізм трансформації єврокнижка. Ролики із захисним покриттям дозволяють без зайвих зусиль розкладати диван, не пошкоджуючи поверхню підлоги. В дивані є просторий ящик з аераторами (спеціальними отворами для проникнення повітря) для зберігання ваших речей і постільної білизни. На тильній стороні дивана передбачена м'яка планка, обтягнута тканиною – практична деталь, завдяки якій ви не будете притулятися до стіни під час сну. <p>У комплекті йдуть 3 великі диванні подушки в зйомних чохлах на «блискавці» з наповнювачем холлофайбер – синтетичним гіпоалергенним волокном, яке не злежується і зберігає форму подушок довгий час. Наповнювач екологічний, він не горить, не вбирає вологу і запахи.</p>", "Класичний кутовий диван"],
    ["/public/images/k2_1.jpg", "Великий кутовий диван «LOUNGE» підкорить ваших гостей вражаючими габаритами та м'якою глибокою посадкою. А, якщо хтось із них засидиться допізна, – ви легко зможете перетворити диван на просторе ліжко. Місця вистачить усім! <p>За допомогою механізму трансформації єврокнижка диван без зайвих зусиль перетворюється на мега-просторе ліжко, розміром 3.0 х 1.55 м: цільна широка секція дивана виїжджає вперед, а спинка укладається на місце, що звільнилося. Рухома частина дивана оснащена роликами з захисним покриттям, що запобігає пошкодженню підлоги.</p> <p>В дивані передбачено 2 ящика для зберігання речей і постільної білизни: 1 великий ящик під цільною виїзною секцією та 1 менший ящик під нерухомою кутовою кушеткою «крокодил» (газ-ліфт). Ящики оснащені аераторами – спеціальними отворами для циркуляції повітря.</p> <p>У комплекті йдуть 8 диванні подушки в зйомних чохлах на «блискавці» з наповнювачем холлофайбер – синтетичним гіпоалергенним волокном, яке не злежується і зберігає форму подушок довгий час. Наповнювач екологічний, він не горить, не вбирає вологу і запахи.</p> <p>Для збірки нашого дивану вам не потрібні спеціальні навички, інструменти та болти, так як кожен наш диван має функцію швидкої збірки. Ви з легкістю зможете самостійно розібрати, або зібрати диван, що значно полегшить його трансформування</p>", "Великий кутовий диван"],
    ["/public/images/k3_1.jpg", "Класичний кутовий диван «MONOLIT» – це звична класика в сучасному виконанні. Прикрашають диван великі диванні подушки з контрастною строчкою і декоративними втяжками. В основі ортопедичного дивана – надійний механізм трансформації єврокнижка. Ролики із захисним покриттям дозволяють без зайвих зусиль розкладати диван, не пошкоджуючи поверхню підлоги. В дивані є просторий ящик з аераторами (спеціальними отворами для проникнення повітря) для зберігання ваших речей і постільної білизни. На тильній стороні дивана передбачена м'яка планка, обтягнута тканиною – практична деталь, завдяки якій ви не будете притулятися до стіни під час сну. <p>У комплекті йдуть 3 великі диванні подушки в зйомних чохлах на «блискавці» з наповнювачем холлофайбер – синтетичним гіпоалергенним волокном, яке не злежується і зберігає форму подушок довгий час. Наповнювач екологічний, він не горить, не вбирає вологу і запахи.</p> <p>Для збірки нашого дивану вам не потрібні спеціальні навички, інструменти та болти, так як кожен наш диван має функцію швидкої збірки. Ви з легкістю зможете самостійно розібрати, або зібрати диван, що значно полегшить його трансформування</p>", "Класичний кутовий диван"],
    ["/public/images/k4_1.jpg", "Класичний кутовий диван «MONOLIT» – це звична класика в сучасному виконанні. Прикрашають диван великі диванні подушки з контрастною строчкою і декоративними втяжками. В основі ортопедичного дивана – надійний механізм трансформації єврокнижка. Ролики із захисним покриттям дозволяють без зайвих зусиль розкладати диван, не пошкоджуючи поверхню підлоги. В дивані є просторий ящик з аераторами (спеціальними отворами для проникнення повітря) для зберігання ваших речей і постільної білизни. На тильній стороні дивана передбачена м'яка планка, обтягнута тканиною – практична деталь, завдяки якій ви не будете притулятися до стіни під час сну. <p>У комплекті йдуть 3 великі диванні подушки в зйомних чохлах на «блискавці» з наповнювачем холлофайбер – синтетичним гіпоалергенним волокном, яке не злежується і зберігає форму подушок довгий час. Наповнювач екологічний, він не горить, не вбирає вологу і запахи.</p> <p>Для збірки нашого дивану вам не потрібні спеціальні навички, інструменти та болти, так як кожен наш диван має функцію швидкої збірки. Ви з легкістю зможете самостійно розібрати, або зібрати диван, що значно полегшить його трансформування</p>", "Класичний кутовий диван"],
    ["/public/images/k5_1.jpg", "Класичний кутовий диван «MONOLIT» – це звична класика в сучасному виконанні. Прикрашають диван великі диванні подушки з контрастною строчкою і декоративними втяжками. В основі ортопедичного дивана – надійний механізм трансформації єврокнижка. Ролики із захисним покриттям дозволяють без зайвих зусиль розкладати диван, не пошкоджуючи поверхню підлоги. В дивані є просторий ящик з аераторами (спеціальними отворами для проникнення повітря) для зберігання ваших речей і постільної білизни. На тильній стороні дивана передбачена м'яка планка, обтягнута тканиною – практична деталь, завдяки якій ви не будете притулятися до стіни під час сну. <p>У комплекті йдуть 3 великі диванні подушки в зйомних чохлах на «блискавці» з наповнювачем холлофайбер – синтетичним гіпоалергенним волокном, яке не злежується і зберігає форму подушок довгий час. Наповнювач екологічний, він не горить, не вбирає вологу і запахи.</p> <p>Для збірки нашого дивану вам не потрібні спеціальні навички, інструменти та болти, так як кожен наш диван має функцію швидкої збірки. Ви з легкістю зможете самостійно розібрати, або зібрати диван, що значно полегшить його трансформування</p>", "Класичний кутовий диван"],
    ["/public/images/k6_1.jpg", "Незвичайний кутовий диван-ліжко «OLIMP» – поєднує в собі класичний кутовий диван та повногабаритне двоспальне ліжко для вимогливих покупців, які хочуть бачити не тільки сучасний диван, але й повноцінне ліжко з розкішним узголів'ям. <p>У комплекті йдуть 2 великі диванні подушки в зйомних чохлах на «блискавці» з наповнювачем холлофайбер – синтетичним гіпоалергенним волокном, яке не злежується і зберігає форму подушок довгий час. Наповнювач екологічний, він не горить, не вбирає вологу і запахи.</p> <p>В дивані передбачено 2 ящика для зберігання речей і постільної білизни: 1 великий ящик під цільною виїзною секцією та 1 менший ящик під нерухомою кутовою кушеткою «крокодил» (газ-ліфт). Ящики оснащені аераторами – спеціальними отворами для циркуляції повітря.</p> <p>Для збірки нашого дивану вам не потрібні спеціальні навички, інструменти та болти, так як кожен наш диван має функцію швидкої збірки. Ви з легкістю зможете самостійно розібрати, або зібрати диван, що значно полегшить його трансформування</p>", "Кутовий диван-ліжко"],
    ["/public/images/k7_1.jpg", "Класичний кутовий диван «MONOLIT» – це звична класика в сучасному виконанні. Прикрашають диван великі диванні подушки з контрастною строчкою і декоративними втяжками. В основі ортопедичного дивана – надійний механізм трансформації єврокнижка. Ролики із захисним покриттям дозволяють без зайвих зусиль розкладати диван, не пошкоджуючи поверхню підлоги. В дивані є просторий ящик з аераторами (спеціальними отворами для проникнення повітря) для зберігання ваших речей і постільної білизни. На тильній стороні дивана передбачена м'яка планка, обтягнута тканиною – практична деталь, завдяки якій ви не будете притулятися до стіни під час сну. <p>У комплекті йдуть 3 великі диванні подушки в зйомних чохлах на «блискавці» з наповнювачем холлофайбер – синтетичним гіпоалергенним волокном, яке не злежується і зберігає форму подушок довгий час. Наповнювач екологічний, він не горить, не вбирає вологу і запахи.</p> <p>Для збірки нашого дивану вам не потрібні спеціальні навички, інструменти та болти, так як кожен наш диван має функцію швидкої збірки. Ви з легкістю зможете самостійно розібрати, або зібрати диван, що значно полегшить його трансформування</p> ", "Класичний кутовий диван"],

    //-------------------------МОД-----------------------------
    ["/public/images/m1_1.png", "Великий модульний диван «BARON» створений для прихильників супер-комфорту. Неймовірно зручна та глибока посадка дивана подарує вам відчуття м'якого розслаблення. Широкі підлокітники, подушки та царга дивана, які надають дивану незвичайний і стильний вигляд. <p>Модульний диван «BARON» складається з п'яти частин: двох нерухомих елементів – кутової секції та кутового елемента розміром 1.0 х 1.35 м, а також з трьох рухомих секцій завширшки 1.0 м, кожна з яких може висуватися вперед незалежно від іншої. Диван може використовуватися для сну будь-яким способом:</p> <ul><li>1. розклавши тільки крайні секції, ви перетворите диван на два незалежних спальних місця, розділених середнім елементом</li><li>2. висунувши вперед обидві центральні секції та опустивши спинки – отримуєте дуже просторе ліжко</li></ul> <p>Механізм трансформації дивана – єврокнижка. Рухомі частини дивана оснащені роликами із захисним покриттям, що запобігає пошкодженню підлоги.</p> <p>У нижній частині дивана, під кожною прямою секцією є 3 просторих ящика для зберігання речей і постільної білизни. Ящики оснащені аераторами – спеціальними отворами для циркуляції повітря.</p> <p>У комплекті йдуть 6 великих диванних подушок в зйомних чохлах на «блискавці» з наповнювачем холлофайбер –синтетичним гіпоалергенним волокном, яке не злежується і зберігає форму подушок довгий час. Наповнювач екологічний, він не горить, не вбирає вологу і запахи.</p>", "Модульний диван"],
    ["/public/images/m2_1.jpg", "Великий модульний диван «BARON» створений для прихильників супер-комфорту. Неймовірно зручна та глибока посадка дивана подарує вам відчуття м'якого розслаблення. Широкі підлокітники, подушки та царга дивана, які надають дивану незвичайний і стильний вигляд. <p>Модульний диван «BARON» складається з п'яти частин: двох нерухомих елементів – кутової секції та кутового елемента розміром 1.0 х 1.35 м, а також з трьох рухомих секцій завширшки 1.0 м, кожна з яких може висуватися вперед незалежно від іншої. Диван може використовуватися для сну будь-яким способом:</p> <ul><li>1. розклавши тільки крайні секції, ви перетворите диван на два незалежних спальних місця, розділених середнім елементом</li><li>2. висунувши вперед обидві центральні секції та опустивши спинки – отримуєте дуже просторе ліжко</li></ul> <p>Механізм трансформації дивана – єврокнижка. Рухомі частини дивана оснащені роликами із захисним покриттям, що запобігає пошкодженню підлоги.</p> <p>У нижній частині дивана, під кожною прямою секцією є 3 просторих ящика для зберігання речей і постільної білизни. Ящики оснащені аераторами – спеціальними отворами для циркуляції повітря.</p> <p>У комплекті йдуть 6 великих диванних подушок в зйомних чохлах на «блискавці» з наповнювачем холлофайбер –синтетичним гіпоалергенним волокном, яке не злежується і зберігає форму подушок довгий час. Наповнювач екологічний, він не горить, не вбирає вологу і запахи.</p>", "Модульний диван"],
    ["/public/images/m3_1.jpg", "Великий модульний диван «BARON» створений для прихильників супер-комфорту. Неймовірно зручна та глибока посадка дивана подарує вам відчуття м'якого розслаблення. Широкі підлокітники, подушки та царга дивана, які надають дивану незвичайний і стильний вигляд. <p>Модульний диван «BARON» складається з п'яти частин: двох нерухомих елементів – кутової секції та кутового елемента розміром 1.0 х 1.35 м, а також з трьох рухомих секцій завширшки 1.0 м, кожна з яких може висуватися вперед незалежно від іншої. Диван може використовуватися для сну будь-яким способом:</p> <ul><li>1. розклавши тільки крайні секції, ви перетворите диван на два незалежних спальних місця, розділених середнім елементом</li><li>2. висунувши вперед обидві центральні секції та опустивши спинки – отримуєте дуже просторе ліжко</li></ul> <p>Механізм трансформації дивана – єврокнижка. Рухомі частини дивана оснащені роликами із захисним покриттям, що запобігає пошкодженню підлоги.</p> <p>У нижній частині дивана, під кожною прямою секцією є 3 просторих ящика для зберігання речей і постільної білизни. Ящики оснащені аераторами – спеціальними отворами для циркуляції повітря.</p> <p>У комплекті йдуть 6 великих диванних подушок в зйомних чохлах на «блискавці» з наповнювачем холлофайбер –синтетичним гіпоалергенним волокном, яке не злежується і зберігає форму подушок довгий час. Наповнювач екологічний, він не горить, не вбирає вологу і запахи.</p>", "Модульний диван"]
  ],

  fixHeight: [
    //-------------------------ПРЯМІ-----------------------------
    ["/public/images/p1_1.jpg", "width: 650px; height: 350px; object-fit: cover;"],
    ["/public/images/p2_1.jpg", "width: 650px; height: 420px; object-fit: cover; margin-top: -20px;"],
    ["/public/images/p3_1.jpg", "width: 650px; height: 380px; object-fit: cover; margin-top: -20px;"],
    ["/public/images/p4_1.jpg", "width: 650px; height: 350px; object-fit: cover; "],
    ["/public/images/p5_1.jpg", "width: 650px; height: 422px; object-fit: cover;"],
    ["/public/images/p6_1.jpg", "width: 650px; height: 405px; object-fit: cover;"],
    ["/public/images/p7_1.jpg", "width: 650px; height: 435px; object-fit: cover; margin-top: -60px;"],
    ["/public/images/p8_1.jpg", "width: 650px; height: 370px; object-fit: cover;"],
    ["/public/images/p9_1.jpg", "width: 650px; height: 435px; object-fit: cover;     margin-right: -20px;     margin-left: 20px;"],
    ["/src/assets/images/straight sofas/p9_2.jpg", "width: 650px; height: 435px; object-fit: cover; margin-right: -30px; margin-left: 60px;"],
    ["/public/images/p10_1.jpg", "width: 750px;  object-fit: cover;"],

    //-------------------------КУТ-----------------------------
    ["/public/images/k1_1.png", "width: 700px; object-fit: cover;"],
    ["/public/images/k2_1.jpg", "width: 650px; height: 400px; object-fit: cover;"],
    ["/public/images/k3_1.jpg", "width: 650px; height: 355px; object-fit: cover;"],
    ["/public/images/k4_1.jpg", "width: 650px; height: 400px; object-fit: cover;"],
    ["/public/images/k5_1.jpg", "width: 650px; height: 430px; object-fit: cover;"],
    ["/public/images/k6_1.jpg", "width: 750px; height: 430px; object-fit: cover;     margin-right: -50px;     margin-left: 50px;"],
    ["/public/images/k7_1.jpg", "width: 700px;  object-fit: cover;"],

    //-------------------------МОД-----------------------------
    ["/public/images/m1_1.png", "width: 700px; object-fit: cover;"],
    ["/public/images/m2_1.jpg", "width: 700px; height: 350px; object-fit: cover;"],
    ["/public/images/m3_1.jpg", "width: 700px; height: 350px; object-fit: cover;"]
  ]


};

const getImagesArray = (imageKey) => {
  for (let i = 0; i < SOFAS.images.length; i++) {
    if (SOFAS.images[i][0] === imageKey) {
      return SOFAS.images[i]; // Повертаємо масив без першого елемента
    }
  }
  return [];
}

const getOpsArray = (imageKey) => {
  for (let i = 0; i < SOFAS.ops.length; i++) {
    if (SOFAS.ops[i][0] === imageKey) {
      return SOFAS.ops[i]; // Повертаємо опис для відповідного ключа
    }
  }
  return "";
}

const getFixHeight = (imageKey) => {
  for (let i = 0; i < SOFAS.fixHeight.length; i++) {
    if (SOFAS.fixHeight[i][0] === imageKey) {
      return SOFAS.fixHeight[i][1]; // Повертаємо опис для відповідного ключа
    }
  }
  return "";

  
}

const productTemplate = ({ product }) => {
  const shoppingCart = JSON.parse(localStorage.getItem('shoppingCart')) || []
  const favorites = JSON.parse(localStorage.getItem('favorites')) || []
  const hasInCart = shoppingCart.includes(product._id)
  const hasInFavorites = favorites.includes(product._id)



  const imagesArray = getImagesArray(product.image);
  const opsDescription = getOpsArray(product.image);
  const FixHeightArr = getFixHeight(product.image);
  
  const thumbnails = imagesArray.map(image => `
    <img
      class="product-image"
      src="${image}"
      alt="product image"
      data-src="${image}"
    />
  `).join('');

  return `
    <div class="product-row">

    <div class="slider">
        <div class="thumbnails">
        ${thumbnails}
        </div>
        <div class="main-image">
            <button class="nav prev"></button>
            <img src="${imagesArray[0]}" alt="Main Image" id="main-image" class="fade" style="${FixHeightArr}">
            <button class="nav next"></button>
        </div>
    </div>
      
    
    </div>
    <div class="call-sell">
    <h1>${product.name}</h1>
    <span class="price-cont">
             <span class="price">Ціна: ${product.price}</span>
               грн
            </span>
            <h2>${opsDescription[2]}</h2>
          <h2>Телефон: <span class="phone-sell">+380 63 934 0346</span></h2>
          <h2>Телеграм: <span class="phone-sell">@fgghfhgf</span></h2>
        </div>
        

    <!-- Модальне вікно для перегляду зображень -->
<div id="image-modal" class="modal">
  <span class="close">&times;</span>
  <img class="modal-content" id="modal-image">
  <div id="caption"></div>
</div>
        
    <div class="product-info">      
      
      <div class="product-description" id="content-1">${product.description}</div>
      <div class="product-description" id="content-2">
      <h1>ОПИС</h1>
      <p class="descr-tab2">${opsDescription[1]}</p>
      </div>
      <div class="product-description" id="content-3">
      <h1>ДОСТАВКА</h1>
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum possimus commodi iusto molestias
            cupiditate quas consectetur nemo animi maxime eligendi quia id vitae laudantium quasi eveniet culpa,
            assumenda et illo delectus magni explicabo, totam deserunt. Eaque beatae minus vero vitae! Aperiam corrupti
            enim delectus dicta accusantium, quasi dolore optio mollitia.</p>
      </div>
      <div class="tab-nav">
        <input checked id="tab-btn-1" name="tab-btn" type="radio" value="">
        <label for="tab-btn-1" class="tab-btn-1">Характеристики <div class="fix-shadow-1"></div></label>
        <input id="tab-btn-2" name="tab-btn" type="radio" value="">
        <label for="tab-btn-2" class="tab-btn-2">Опис <div class="fix-shadow-2-3"></div></label>
        <input id="tab-btn-3" name="tab-btn" type="radio" value="">
        <label for="tab-btn-3" class="tab-btn-3">Доставка <div class="fix-shadow-2-3"></div></label>
      </div>
      
    </div>
    <h1 >Наші роботи</h1>
        <div class="carousel">
        
    <div class="carousel-inner">
      <!-- Add your images here -->
      <img src="/src/assets/images/karusel/47.jpg" alt="Image 1" class="carousel-image">
      <img src="/src/assets/images/karusel/2.jpg" alt="Image 2" class="carousel-image">
      <img src="/src/assets/images/karusel/3.jpg" alt="Image 1" class="carousel-image">
      <img src="/src/assets/images/karusel/4.jpg" alt="Image 2" class="carousel-image">
      <img src="/src/assets/images/karusel/5.jpg" alt="Image 1" class="carousel-image">
      <img src="/src/assets/images/karusel/72.jpg" alt="Image 2" class="carousel-image">
      <img src="/src/assets/images/karusel/7.jpg" alt="Image 1" class="carousel-image">
      <img src="/src/assets/images/karusel/8.jpg" alt="Image 2" class="carousel-image">
      <img src="/src/assets/images/karusel/10.jpg" alt="Image 1" class="carousel-image">
      <img src="/src/assets/images/karusel/11.jpg" alt="Image 2" class="carousel-image">
      <img src="/src/assets/images/karusel/12.jpg" alt="Image 1" class="carousel-image">
      <img src="/src/assets/images/karusel/13.jpg" alt="Image 2" class="carousel-image">
      <img src="/src/assets/images/karusel/71.jpg" alt="Image 1" class="carousel-image">
      <img src="/src/assets/images/karusel/15.jpg" alt="Image 2" class="carousel-image">
      <img src="/src/assets/images/karusel/48.jpg" alt="Image 1" class="carousel-image">
      <img src="/src/assets/images/karusel/17.jpg" alt="Image 2" class="carousel-image">
      <img src="/src/assets/images/karusel/18.jpg" alt="Image 1" class="carousel-image">
      <img src="/src/assets/images/karusel/19.jpg" alt="Image 2" class="carousel-image">
      <img src="/src/assets/images/karusel/20.jpg" alt="Image 1" class="carousel-image">
      <img src="/src/assets/images/karusel/21.jpg" alt="Image 2" class="carousel-image">
      <img src="/src/assets/images/karusel/22.jpg" alt="Image 1" class="carousel-image">
      <img src="/src/assets/images/karusel/23.jpg" alt="Image 2" class="carousel-image">
      <img src="/src/assets/images/karusel/24.jpg" alt="Image 1" class="carousel-image">
      <img src="/src/assets/images/karusel/25.jpg" alt="Image 2" class="carousel-image">
      <img src="/src/assets/images/karusel/26.jpg" alt="Image 1" class="carousel-image">
      <img src="/src/assets/images/karusel/52.jpg" alt="Image 2" class="carousel-image">
      <img src="/src/assets/images/karusel/28.jpg" alt="Image 2" class="carousel-image">
      <img src="/src/assets/images/karusel/69.jpg" alt="Image 1" class="carousel-image">
      <img src="/src/assets/images/karusel/55.jpg" alt="Image 2" class="carousel-image">
      <img src="/src/assets/images/karusel/31.jpg" alt="Image 1" class="carousel-image">
      <img src="/src/assets/images/karusel/32.jpg" alt="Image 2" class="carousel-image">
      <img src="/src/assets/images/karusel/33.jpg" alt="Image 1" class="carousel-image">
      <img src="/src/assets/images/karusel/34.jpg" alt="Image 2" class="carousel-image">
      <img src="/src/assets/images/karusel/35.jpg" alt="Image 1" class="carousel-image">
      <img src="/src/assets/images/karusel/59.jpg" alt="Image 2" class="carousel-image">
      <img src="/src/assets/images/karusel/37.jpg" alt="Image 1" class="carousel-image">
      <img src="/src/assets/images/karusel/38.jpg" alt="Image 2" class="carousel-image">
      <img src="/src/assets/images/karusel/39.jpg" alt="Image 1" class="carousel-image">
      <img src="/src/assets/images/karusel/60.jpg" alt="Image 2" class="carousel-image">
      <img src="/src/assets/images/karusel/61.jpg" alt="Image 1" class="carousel-image">
      <img src="/src/assets/images/karusel/42.jpg" alt="Image 2" class="carousel-image">
      <img src="/src/assets/images/karusel/67.jpg" alt="Image 2" class="carousel-image">
      <img src="/src/assets/images/karusel/44.jpg" alt="Image 2" class="carousel-image">
      <img src="/src/assets/images/karusel/63.jpg" alt="Image 2" class="carousel-image">
      <img src="/src/assets/images/karusel/73.jpg" alt="Image 1" class="carousel-image">
      <img src="/src/assets/images/karusel/74.jpg" alt="Image 2" class="carousel-image">
      <img src="/src/assets/images/karusel/75.jpg" alt="Image 1" class="carousel-image">
      <img src="/src/assets/images/karusel/76.jpg" alt="Image 2" class="carousel-image">
      <img src="/src/assets/images/karusel/77.jpg" alt="Image 1" class="carousel-image">
      <img src="/src/assets/images/karusel/78.jpg" alt="Image 2" class="carousel-image">
      <img src="/src/assets/images/karusel/79.jpg" alt="Image 2" class="carousel-image">
      <img src="/src/assets/images/karusel/80.jpg" alt="Image 2" class="carousel-image">
      <img src="/src/assets/images/karusel/81.jpg" alt="Image 2" class="carousel-image">
      <img src="/src/assets/images/karusel/82.jpg" alt="Image 2" class="carousel-image">
      <img src="/src/assets/images/karusel/47.jpg" alt="Image 1" class="carousel-image">
      <img src="/src/assets/images/karusel/2.jpg" alt="Image 2" class="carousel-image">
      <img src="/src/assets/images/karusel/3.jpg" alt="Image 1" class="carousel-image">
      <img src="/src/assets/images/karusel/4.jpg" alt="Image 2" class="carousel-image">
      <img src="/src/assets/images/karusel/5.jpg" alt="Image 1" class="carousel-image">
      <img src="/src/assets/images/karusel/72.jpg" alt="Image 2" class="carousel-image">    

      <!-- Repeat for all images -->
    </div>
  </div>
  `
  
}


function initializeSlider() {
  const thumbnails = document.querySelectorAll('.thumbnails img');
  const mainImage = document.getElementById('main-image');
  const prevButton = document.querySelector('.nav.prev');
  const nextButton = document.querySelector('.nav.next');
  let currentIndex = 0;



  const images = Array.from(thumbnails).map(thumbnail => thumbnail.dataset.src);

  // Модальне вікно та елементи
  const modal = document.getElementById('image-modal');
  const modalImage = document.getElementById('modal-image');
  const closeModal = document.querySelector('.close');

  function updateActiveThumbnail() {
    thumbnails.forEach((thumbnail, index) => {
      if (index === currentIndex) {
        thumbnail.classList.add('active');
      } else {
        thumbnail.classList.remove('active');
      }
    });
  }

  thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
      mainImage.src = thumbnail.dataset.src;
      currentIndex = index;
      updateActiveThumbnail();
    });
  });

  // Обробка натискань на зображення каруселі
  const carouselImages = document.querySelectorAll('.carousel-image');
  carouselImages.forEach(image => {
    image.addEventListener('click', () => {
      modal.style.display = 'flex';
      modalImage.src = image.src;
    });
  });

  prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
    mainImage.src = images[currentIndex];
    updateActiveThumbnail();
  });

  nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
    mainImage.src = images[currentIndex];
    updateActiveThumbnail();
  });

  // Закриття модального вікна
  closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  // Закриття модального вікна при натисканні поза ним
  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
  updateActiveThumbnail();
  
}

document.addEventListener('DOMContentLoaded', initializeSlider);
; (async () => {
  const { ProductService } = await import('../services/product.js')
  const { addToCart } = await import('./components/add-to-cart.js')
  const { addToFavorite } = await import('./components/add-to-favorite.js')
  const { addToWatched } = await import('./components/add-to-watched.js')

  const DOM = actualDOM()

  try {
    const productId = new URLSearchParams(window.location.search).get(
      'productId'
    )
    const responseProduct = await ProductService.getOne({ productId })

    if (!responseProduct.success) return

    if (Object.keys(responseProduct.product).length) {
      const product = responseProduct.product

      DOM.product.innerHTML = productTemplate({ product })
      document.title = `${responseProduct.product.name} | FixHealth`

      addToCart()
      addToFavorite()
      addToWatched({ productId: product._id })
      initializeSlider();
    }
  } catch (error) {
    console.log(error)
  }

})()


