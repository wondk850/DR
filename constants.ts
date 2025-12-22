import { Question } from './types';

export const QUESTIONS: Question[] = [
  // --- Vocabulary (1-8) ---
  {
    "id": 1,
    "category": "Vocabulary",
    "difficulty": 1,
    "question_text": "다음 단어 'habit'의 올바른 뜻은?",
    "options": ["취미", "습관", "건강", "예절"],
    "correct_answer": "습관",
    "tags": ["voc_meaning", "voc_noun"],
    "explanation": "Habit은 '습관'입니다. 취미는 hobby입니다.",
    "wrong_feedback": {
      "취미": "아깝다! 취미는 'hobby'야. h-a-b-i-t은 습관!",
      "건강": "건강은 'health'야.",
      "예절": "예절은 'manners' 또는 'etiquette'이야."
    }
  },
  {
    "id": 2,
    "category": "Vocabulary",
    "difficulty": 1,
    "question_text": "다음 중 '초대하다'의 영어 단어는?",
    "options": ["invent", "introduce", "invite", "interview"],
    "correct_answer": "invite",
    "tags": ["voc_meaning", "voc_verb", "voc_confusion"],
    "explanation": "Invite가 초대하다입니다.",
    "wrong_feedback": {
      "invent": "Invent는 '발명하다'야.",
      "introduce": "Introduce는 '소개하다'야.",
      "interview": "Interview는 '면접보다'야."
    }
  },
  {
    "id": 3,
    "category": "Vocabulary",
    "difficulty": 2,
    "question_text": "다음 영영풀이에 해당하는 단어는? 'To keep someone or something safe from injury or damage'",
    "options": ["produce", "protect", "provide", "protest"],
    "correct_answer": "protect",
    "tags": ["voc_eng_def", "voc_verb"],
    "explanation": "안전하게 지키는 것은 'protect(보호하다)'입니다.",
    "wrong_feedback": {
      "produce": "Produce는 생산하다.",
      "provide": "Provide는 제공하다.",
      "protest": "Protest는 항의하다."
    }
  },
  {
    "id": 4,
    "category": "Vocabulary",
    "difficulty": 3,
    "question_text": "다음 밑줄 친 단어의 쓰임이 나머지 셋과 다른 것은?\n1. He runs a small business.\n2. She runs fast.\n3. Water runs down the hill.\n4. The bus runs every 10 minutes.",
    "options": ["1번", "2번", "3번", "4번"],
    "correct_answer": "1번",
    "tags": ["voc_polysemy", "voc_advanced"],
    "explanation": "1번의 run은 '경영하다/운영하다'의 뜻이고, 나머지는 '달리다/흐르다/운행하다(이동)'의 의미입니다.",
    "wrong_feedback": {
      "2번": "2,3,4번은 모두 물리적인 움직임을 나타내지만 1번은 아니야.",
      "3번": "액체가 흐르는 것도 run이야.",
      "4번": "버스나 기차가 운행하는 것도 run이야."
    }
  },
  {
    "id": 5,
    "category": "Vocabulary",
    "difficulty": 2,
    "question_text": "'존경하다'의 유의어가 아닌 것은?",
    "options": ["respect", "look up to", "admire", "despise"],
    "correct_answer": "despise",
    "tags": ["voc_synonym", "voc_verb"],
    "explanation": "Despise는 '경멸하다'라는 뜻으로 반의어에 가깝습니다.",
    "wrong_feedback": {
      "respect": "존경하다 맞아.",
      "look up to": "존경하다의 숙어 표현이야.",
      "admire": "감탄하며 존경하다 맞아."
    }
  },
  {
    "id": 6,
    "category": "Vocabulary",
    "difficulty": 3,
    "question_text": "빈칸에 공통으로 들어갈 말은?\n- Can you _____ me a favor?\n- I have a lot of homework to _____.",
    "options": ["make", "do", "take", "have"],
    "correct_answer": "do",
    "tags": ["voc_collocation", "voc_verb"],
    "explanation": "do a favor(부탁을 들어주다), do homework(숙제하다)가 맞는 표현입니다.",
    "wrong_feedback": {
      "make": "make a favor란 표현은 없어. make homework도 틀린 표현이야.",
      "take": "take a favor (X)"
    }
  },
   {
    "id": 7,
    "category": "Vocabulary",
    "difficulty": 3,
    "question_text": "'Government'의 철자가 맞는 것은?",
    "options": ["Goverment", "Government", "Govenment", "Governmet"],
    "correct_answer": "Government",
    "tags": ["voc_spelling", "voc_advanced"],
    "explanation": "Govern(지배하다) + ment(명사형 접미사) = Government.",
    "wrong_feedback": {
      "Goverment": "n이 빠졌어. Govern + ment 야."
    }
  },
   {
    "id": 8,
    "category": "Vocabulary",
    "difficulty": 2,
    "question_text": "'Participation'의 동사형은?",
    "options": ["part", "partial", "participate", "participant"],
    "correct_answer": "participate",
    "tags": ["voc_form", "voc_verb"],
    "explanation": "Participate는 참가하다(동사), Participant는 참가자(사람명사)입니다.",
    "wrong_feedback": {
      "partial": "Partial은 '부분적인'이라는 형용사야.",
      "participant": "이건 '참가자'라는 명사야."
    }
  },

  // --- Structure (9-15) ---
  {
    "id": 9,
    "category": "Structure",
    "difficulty": 1,
    "question_text": "어순 배열: (내 남동생은 매일 우유를 마신다)\n[ milk / drinks / everyday / brother / My ]",
    "options": ["My brother drinks milk everyday", "My brother milk drinks everyday", "Everyday drinks milk My brother", "Milk drinks My brother everyday"],
    "correct_answer": "My brother drinks milk everyday",
    "tags": ["syn_svo", "syn_word_order"],
    "explanation": "영어는 S(주어) + V(동사) + O(목적어) 순서입니다.",
    "wrong_feedback": {
      "My brother milk drinks everyday": "한국어 어순을 따랐네. 영어는 동사가 목적어보다 먼저 와야 해."
    }
  },
  {
    "id": 10,
    "category": "Structure",
    "difficulty": 2,
    "question_text": "4형식 문장(수여동사)이 아닌 것은?",
    "options": ["She gave me a book.", "He sent her a letter.", "Mom made me a cake.", "I went to school."],
    "correct_answer": "I went to school.",
    "tags": ["syn_4form", "syn_sentence_type"],
    "explanation": "went는 1형식(완전자동사)입니다. 나머지는 모두 '누구에게 무엇을 주다/만들어주다'의 4형식입니다.",
    "wrong_feedback": {
      "She gave me a book.": "gave + me(I.O) + book(D.O) 4형식 맞아."
    }
  },
  {
    "id": 11,
    "category": "Structure",
    "difficulty": 3,
    "question_text": "다음 중 어법상 어색한 문장은? (5형식)",
    "options": ["He made me happy.", "She kept the room clean.", "I found the book easily.", "My dad named the dog Max."],
    "correct_answer": "I found the book easily.",
    "tags": ["syn_5form", "syn_adjective"],
    "explanation": "5형식(find+목적어+목적격보어)에서 보어 자리에 부사(easily)는 올 수 없습니다. easy(형용사)가 와야 '책이 쉽다는 것을 알았다'가 됩니다.",
    "wrong_feedback": {
      "He made me happy.": "make + 목적어 + 형용사(happy). 완벽해.",
      "She kept the room clean.": "keep + 목적어 + 형용사(clean). 맞아."
    }
  },
  {
    "id": 12,
    "category": "Structure",
    "difficulty": 2,
    "question_text": "감각동사 뒤에 올 수 없는 형태는? 'It smells _____.'",
    "options": ["good", "terrible", "sweetly", "like a rose"],
    "correct_answer": "sweetly",
    "tags": ["syn_2form", "grm_adjective"],
    "explanation": "감각동사(look, smell, taste...) 뒤에는 형용사가 와야 합니다. 부사(~ly)는 올 수 없습니다.",
    "wrong_feedback": {
      "like a rose": "명사가 오려면 like와 함께 써야 해. 이건 맞아."
    }
  },
  {
    "id": 13,
    "category": "Structure",
    "difficulty": 3,
    "question_text": "다음 문장을 3형식으로 바르게 고친 것은? 'Give me the salt.'",
    "options": ["Give the salt to me.", "Give the salt for me.", "Give the salt of me.", "Give to me the salt."],
    "correct_answer": "Give the salt to me.",
    "tags": ["syn_4form_convert", "grm_preposition"],
    "explanation": "Give는 전치사 to를 사용합니다. (buy, make, get 등은 for 사용)",
    "wrong_feedback": {
      "Give the salt for me.": "Give는 to를 써야 해. for는 make/buy 같은 동사일 때."
    }
  },
  {
    "id": 14,
    "category": "Structure",
    "difficulty": 3,
    "question_text": "가주어-진주어 구문이 바른 것은?",
    "options": ["That is easy to learn English.", "It is easy learning English.", "It is easy to learn English.", "This is easy to learn English."],
    "correct_answer": "It is easy to learn English.",
    "tags": ["syn_it_that", "grm_to_infinitive"],
    "explanation": "가주어는 It만 쓸 수 있습니다. It is (adj) + to-v 구문입니다.",
    "wrong_feedback": {
      "That is easy to learn English.": "가주어 자리에 That은 못 써."
    }
  },
  {
    "id": 15,
    "category": "Structure",
    "difficulty": 2,
    "question_text": "명령문 뒤에 'and'가 올 때의 뜻은? 'Study hard, and you will pass.'",
    "options": ["그러면", "그렇지 않으면", "또는", "그러나"],
    "correct_answer": "그러면",
    "tags": ["syn_conjunction", "syn_imperative"],
    "explanation": "명령문 + and는 '~해라, 그러면 ...할 것이다'입니다. (or는 '그렇지 않으면')",
    "wrong_feedback": {
      "그렇지 않으면": "그건 명령문 + or 일 때의 뜻이야."
    }
  },

  // --- Grammar (16-23) ---
  {
    "id": 16,
    "category": "Grammar",
    "difficulty": 2,
    "question_text": "빈칸에 알맞은 말은? 'I have no friends _____ with.'",
    "options": ["play", "to play", "playing", "played"],
    "correct_answer": "to play",
    "tags": ["grm_infinitive", "grm_adj_usage"],
    "explanation": "명사(friends)를 수식하는 to부정사의 형용사적 용법입니다. 함께 노는 것이므로 전치사 with가 필요합니다.",
    "wrong_feedback": {
      "playing": "여기서는 '~할 친구'라는 미래/가능성의 의미라 to부정사가 적절해."
    }
  },
  {
    "id": 17,
    "category": "Grammar",
    "difficulty": 2,
    "question_text": "현재완료의 용법이 다른 하나는?\n1. I have just finished lunch.\n2. He has already gone home.\n3. Have you ever eaten Kimchi?\n4. They have yet to decide.",
    "options": ["1번", "2번", "3번", "4번"],
    "correct_answer": "3번",
    "tags": ["grm_present_perfect", "grm_pp_usage"],
    "explanation": "1,2,4번은 '완료' 용법이지만, 3번은 '경험' 용법입니다.",
    "wrong_feedback": {
      "1번": "Just는 완료 용법 힌트야.",
      "2번": "Already는 완료 용법 힌트야."
    }
  },
  {
    "id": 18,
    "category": "Grammar",
    "difficulty": 3,
    "question_text": "다음 중 어법상 틀린 문장은?",
    "options": ["I saw him dancing.", "I saw him dance.", "I saw him to dance.", "I heard him sing."],
    "correct_answer": "I saw him to dance.",
    "tags": ["grm_perception", "grm_5form"],
    "explanation": "지각동사(see, hear, watch)는 목적격 보어로 동사원형이나 현재분사(ing)를 취합니다. To부정사는 쓸 수 없습니다.",
    "wrong_feedback": {
      "I saw him dancing.": "지각동사 + ing(진행 강조) 가능해.",
      "I saw him dance.": "지각동사 + 동사원형 가능해."
    }
  },
  {
    "id": 19,
    "category": "Grammar",
    "difficulty": 3,
    "question_text": "관계대명사 생략이 가능한 문장은?",
    "options": ["The boy who is running is my brother.", "I look at the picture which is on the wall.", "This is the book that I bought yesterday.", "He is the teacher who teaches English."],
    "correct_answer": "This is the book that I bought yesterday.",
    "tags": ["grm_relative_omission", "grm_relative"],
    "explanation": "목적격 관계대명사(that I bought)는 생략 가능합니다. 나머지는 모두 주격 관계대명사(+be동사 없이 단독)라 생략 불가합니다.",
    "wrong_feedback": {
      "The boy who is running is my brother.": "주격 관계대명사+be동사(who is)를 묶어서 생략할 순 있지만, who만 생략할 순 없어."
    }
  },
  {
    "id": 20,
    "category": "Grammar",
    "difficulty": 3,
    "question_text": "동명사와 현재분사의 쓰임이 바르게 짝지어진 것은?\n(A) My hobby is collecting coins.\n(B) The sleeping baby is cute.",
    "options": ["A:동명사, B:동명사", "A:현재분사, B:현재분사", "A:동명사, B:현재분사", "A:현재분사, B:동명사"],
    "correct_answer": "A:동명사, B:현재분사",
    "tags": ["grm_gerund_vs_participle", "grm_identification"],
    "explanation": "(A)는 '~하는 것' (보어)이므로 동명사, (B)는 '자고 있는' (진행/상태)이므로 현재분사입니다.",
    "wrong_feedback": {
      "A:현재분사, B:현재분사": "(A)는 진행중인 동작이 아니라 취미가 무엇인지 정의하는 명사적 용법이야."
    }
  },
  {
    "id": 21,
    "category": "Grammar",
    "difficulty": 3,
    "question_text": "접속사 if의 쓰임이 나머지와 다른 것은?",
    "options": ["If it rains, I will stay home.", "I don't know if he likes me.", "If you are tired, take a rest.", "If correct, circle it."],
    "correct_answer": "I don't know if he likes me.",
    "tags": ["grm_if", "grm_conjunction"],
    "explanation": "2번은 '~인지 아닌지(whether)'의 명사절을 이끄는 접속사이고, 나머지는 '만약 ~라면'의 부사절(조건)을 이끄는 접속사입니다.",
    "wrong_feedback": {
      "If it rains, I will stay home.": "조건(만약)의 부사절이야."
    }
  },
  {
    "id": 22,
    "category": "Grammar",
    "difficulty": 3,
    "question_text": "수동태로 바꿀 수 없는 문장은?",
    "options": ["She made a doll.", "They arrived at the station.", "He broke the window.", "Everyone loves her."],
    "correct_answer": "They arrived at the station.",
    "tags": ["grm_passive_convert", "grm_intransitive"],
    "explanation": "Arrive는 자동사(1형식)이므로 목적어가 없어 수동태를 만들 수 없습니다.",
    "wrong_feedback": {
      "He broke the window.": "The window was broken by him. 가능해."
    }
  },
  {
    "id": 23,
    "category": "Grammar",
    "difficulty": 2,
    "question_text": "최상급 표현이 어색한 것은?",
    "options": ["He is the tallest boy in the class.", "This is the most heavy box.", "She is the best singer.", "It is the most exciting game."],
    "correct_answer": "This is the most heavy box.",
    "tags": ["grm_superlative", "grm_adj_form"],
    "explanation": "Heavy는 -y로 끝나므로 heaviest가 되어야 합니다. most heavy는 틀린 표현입니다.",
    "wrong_feedback": {
      "He is the tallest boy in the class.": "tall -> tallest 맞음."
    }
  },

  // --- Reading (24-30) ---
  {
    "id": 24,
    "category": "Reading",
    "difficulty": 1,
    "passage": "My name is Jisu. I like sports. My favorite sport is baseball. I play it every Sunday.",
    "passage_id": "P001",
    "question_text": "지수가 가장 좋아하는 스포츠는?",
    "options": ["축구", "농구", "야구", "테니스"],
    "correct_answer": "야구",
    "tags": ["read_detail", "read_comprehension"],
    "explanation": "본문에 'My favorite sport is baseball'이라고 나와 있습니다.",
    "wrong_feedback": {
      "축구": "Soccer가 아니야."
    }
  },
  {
    "id": 25,
    "category": "Reading",
    "difficulty": 2,
    "passage": "Jisu wants to be a famous baseball player. He practices very hard. He believes practice makes perfect.",
    "passage_id": "P002",
    "question_text": "위 글의 내용과 일치하지 않는 것은?",
    "options": ["지수는 야구선수가 되고 싶어 한다.", "지수는 연습을 열심히 한다.", "지수는 연습이 완벽을 만든다고 믿는다.", "지수는 이미 유명한 선수다."],
    "correct_answer": "지수는 이미 유명한 선수다.",
    "tags": ["read_detail", "read_logic"],
    "explanation": "wants to be(되고 싶어 한다)라고 했지, 이미 유명하다고 하진 않았습니다.",
    "wrong_feedback": {
      "지수는 연습을 열심히 한다.": "Practices very hard라고 나와 있어."
    }
  },
  {
    "id": 26,
    "category": "Reading",
    "difficulty": 3,
    "passage": "Penguins are birds, but they cannot fly. Instead, they are excellent swimmers. Their wings act like flippers to help them swim fast in the water. They live in the Southern Hemisphere, mostly in Antarctica.",
    "passage_id": "P003",
    "question_text": "위 글의 빈칸에 들어갈 접속사로 알맞은 말은? (Instead 자리)",
    "options": ["Therefore", "However", "Instead", "For example"],
    "correct_answer": "Instead",
    "tags": ["read_inference", "read_conjunction"],
    "explanation": "날지 못한다. '대신에(Instead)' 수영을 잘한다가 문맥상 자연스럽습니다.",
    "wrong_feedback": {
      "Therefore": "따라서? 인과관계가 아니야.",
      "However": "그러나? 날지 못한다. 그러나 수영을 잘한다도 말은 되지만, '날개 대신 지느러미 역할'이라는 맥락에서 '대신에'가 더 적절해."
    }
  },
  {
    "id": 27,
    "category": "Reading",
    "difficulty": 3,
    "passage_id": "P003",
    "question_text": "펭귄에 대한 설명으로 옳은 것은?",
    "options": ["하늘을 잘 난다.", "북반구에 주로 산다.", "날개를 지느러미처럼 쓴다.", "수영을 잘 못한다."],
    "correct_answer": "날개를 지느러미처럼 쓴다.",
    "tags": ["read_detail", "read_inference"],
    "explanation": "Wings act like flippers(지느러미)라고 언급되었습니다. 남반구(Southern Hemisphere)에 삽니다.",
    "wrong_feedback": {
      "북반구에 주로 산다.": "Southern Hemisphere는 남반구야."
    }
  },
  {
    "id": 28,
    "category": "Reading",
    "difficulty": 3,
    "passage": "Many people think tomatoes are vegetables. However, botanically speaking, a tomato is a fruit. It develops from the flower of the tomato plant and contains seeds. This is the definition of a fruit.",
    "passage_id": "P004",
    "question_text": "이 글의 요지(Main Idea)로 가장 알맞은 것은?",
    "options": ["Tomatoes are delicious.", "How to grow tomatoes.", "Why tomatoes are technically fruits.", "Vegetables that look like fruits."],
    "correct_answer": "Why tomatoes are technically fruits.",
    "tags": ["read_main_idea", "read_logic"],
    "explanation": "식물학적으로 토마토가 왜 과일인지(씨앗, 꽃에서 발달) 설명하는 글입니다.",
    "wrong_feedback": {
      "Vegetables that look like fruits.": "토마토가 채소가 아니라 과일이라는 내용이야."
    }
  },
  {
    "id": 29,
    "category": "Reading",
    "difficulty": 3,
    "passage_id": "P004",
    "question_text": "토마토가 과일인 이유로 언급된 것은?",
    "options": ["It is red.", "It tastes sweet.", "It has seeds.", "It grows in the ground."],
    "correct_answer": "It has seeds.",
    "tags": ["read_detail", "read_inference"],
    "explanation": "contains seeds(씨앗을 포함한다)가 과일의 정의라고 했습니다.",
    "wrong_feedback": {
      "It grows in the ground.": "땅에서 자라는 건 언급되지 않았고 과일의 정의도 아니야."
    }
  },
  {
    "id": 30,
    "category": "Reading",
    "difficulty": 3,
    "passage": "Last weekend, I went camping with my family. (A) It was dark at night. (B) We made a fire and cooked marshmallows. (C) My dad told us scary stories. (D) I was so scared that I couldn't sleep well.",
    "passage_id": "P005",
    "question_text": "다음 문장이 들어갈 위치로 가장 알맞은 곳은? [ The stars were shining brightly in the sky. ]",
    "options": ["(A)", "(B)", "(C)", "(D)"],
    "correct_answer": "(B)",
    "tags": ["read_flow", "read_logic"],
    "explanation": "(A) 밤이 어두웠다. -> [별들이 빛나고 있었다.] -> (B) 불을 피웠다. 순서가 자연스럽습니다. 밤 풍경 묘사 후 활동으로 이어집니다.",
    "wrong_feedback": {
      "(D)": "무서워서 잠을 못 잤다는 결말 뒤에 별 이야기는 어색해."
    }
  }
];