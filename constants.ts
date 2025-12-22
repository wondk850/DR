import { Question } from './types';

export const QUESTIONS: Question[] = [
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
      "invent": "Invent는 '발명하다'야. 에디슨 생각하자!",
      "introduce": "Introduce는 '소개하다'야. 'Let me introduce myself.'",
      "interview": "Interview는 '면접보다'야."
    }
  },
  {
    "id": 3,
    "category": "Vocabulary",
    "difficulty": 2,
    "question_text": "'경험'을 뜻하는 단어는?",
    "options": ["experiment", "example", "exercise", "experience"],
    "correct_answer": "experience",
    "tags": ["voc_spelling", "voc_noun", "voc_confusion"],
    "explanation": "Experience가 경험입니다.",
    "wrong_feedback": {
      "experiment": "철자가 비슷하지? 이건 '실험'이야.",
      "example": "Example은 '예시/보기'야.",
      "exercise": "Exercise는 '운동'이야."
    }
  },
  {
    "id": 4,
    "category": "Vocabulary",
    "difficulty": 3,
    "question_text": "'정부(Government)'의 올바른 철자는?",
    "options": ["Goverment", "Government", "Govenment", "Governmet"],
    "correct_answer": "Government",
    "tags": ["voc_spelling", "voc_advanced"],
    "explanation": "n이 들어가는 Gover-n-ment가 맞습니다.",
    "wrong_feedback": {
      "Goverment": "가장 많이 틀리는 오답! 중간에 'n'이 꼭 들어가야 해. Gover-N-ment."
    }
  },
  {
    "id": 5,
    "category": "Vocabulary",
    "difficulty": 2,
    "question_text": "다음 문맥에 알맞은 단어는? 'We must _____ nature.' (보호하다)",
    "options": ["produce", "protect", "provide", "promise"],
    "correct_answer": "protect",
    "tags": ["voc_context", "voc_verb"],
    "explanation": "자연을 '보호하다'는 protect입니다.",
    "wrong_feedback": {
      "produce": "Produce는 '생산하다/만들다'야.",
      "provide": "Provide는 '제공하다/주다'야.",
      "promise": "Promise는 '약속하다'야."
    }
  },
  {
    "id": 6,
    "category": "Vocabulary",
    "difficulty": 2,
    "question_text": "'존경하다'의 뜻을 가진 단어는?",
    "options": ["repeat", "refuse", "respect", "remind"],
    "correct_answer": "respect",
    "tags": ["voc_meaning", "voc_verb"],
    "explanation": "Respect는 존경하다/존중하다입니다.",
    "wrong_feedback": {
      "repeat": "Repeat는 '반복하다'야.",
      "refuse": "Refuse는 '거절하다'야.",
      "remind": "Remind는 '상기시키다/생각나게 하다'야."
    }
  },
  {
    "id": 7,
    "category": "Structure",
    "difficulty": 1,
    "question_text": "다음 단어를 바르게 배열한 것은? (내 남동생은 매일 우유를 마신다)\n[ milk / drinks / everyday / brother / My ]",
    "options": ["My brother drinks milk everyday", "My brother milk drinks everyday", "Everyday drinks milk My brother", "Milk drinks My brother everyday"],
    "correct_answer": "My brother drinks milk everyday",
    "tags": ["syn_svo", "syn_word_order"],
    "explanation": "영어는 '주어(누가) + 동사(한다) + 목적어(무엇을)' 순서입니다.",
    "wrong_feedback": {
      "My brother milk drinks everyday": "땡! 한국말처럼 '우유를 마신다' 순서로 썼네. 영어는 '마신다 우유를' 순서야.",
      "Everyday drinks milk My brother": "주어가 맨 앞에 와야지.",
      "Milk drinks My brother everyday": "이러면 '우유가 남동생을 마신다'는 뜻이 돼. 무섭지?"
    }
  },
  {
    "id": 8,
    "category": "Structure",
    "difficulty": 1,
    "question_text": "다음 중 동사(V)를 모두 고르시오. 'The happy boy runs in the park.'",
    "options": ["happy", "boy", "runs", "park"],
    "correct_answer": "runs",
    "tags": ["syn_verb_id", "syn_pos"],
    "explanation": "주어의 동작을 나타내는 'runs(달린다)'가 동사입니다.",
    "wrong_feedback": {
      "happy": "Happy는 명사를 꾸며주는 '형용사'야.",
      "boy": "Boy는 동작의 주인인 '명사(주어)'야.",
      "park": "Park는 장소를 나타내는 '명사'야."
    }
  },
  {
    "id": 9,
    "category": "Structure",
    "difficulty": 2,
    "question_text": "4형식 문장 어순이 바른 것은? (그녀는 나에게 사탕을 주었다)",
    "options": ["She gave some candy me.", "She gave me some candy.", "She me gave some candy.", "She gave to me some candy."],
    "correct_answer": "She gave me some candy.",
    "tags": ["syn_4form", "syn_word_order"],
    "explanation": "수여동사(gave) + 받는사람(me) + 물건(some candy) 순서입니다.",
    "wrong_feedback": {
      "She gave some candy me.": "물건이 먼저 오면 전치사(to)가 필요해 (3형식).",
      "She me gave some candy.": "동사는 주어 바로 뒤에 와야 해.",
      "She gave to me some candy.": "to를 쓰면 3형식 문장이야. 4형식은 전치사 없이 '사람+물건'이야."
    }
  },
  {
    "id": 10,
    "category": "Structure",
    "difficulty": 3,
    "question_text": "다음 문장의 주어는? 'Reading books is good for you.'",
    "options": ["Reading books", "is", "good", "you"],
    "correct_answer": "Reading books",
    "tags": ["syn_subject_id", "grm_gerund"],
    "explanation": "동사(is) 앞부분 전체인 'Reading books(책을 읽는 것)'가 주어입니다.",
    "wrong_feedback": {
      "is": "is는 동사야.",
      "good": "good은 보어(형용사)야.",
      "you": "you는 전치사 뒤에 온 명사야."
    }
  },
  {
    "id": 11,
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
      "축구": "지문에서 'favorite sport'를 다시 찾아봐. soccer가 아니야.",
      "농구": "지문에 basketball이란 단어는 없어.",
      "테니스": "tennis도 지문에 없어."
    }
  },
  {
    "id": 12,
    "category": "Reading",
    "difficulty": 1,
    "passage_id": "P001",
    "question_text": "지수는 언제 야구를 하나요?",
    "options": ["매일", "토요일마다", "일요일마다", "방과 후에"],
    "correct_answer": "일요일마다",
    "tags": ["read_detail", "read_frequency"],
    "explanation": "'every Sunday'는 일요일마다라는 뜻입니다.",
    "wrong_feedback": {
      "매일": "'everyday'가 아니라 'every Sunday'야.",
      "토요일마다": "Sunday는 일요일이야.",
      "방과 후에": "after school이란 말은 없어."
    }
  },
  {
    "id": 13,
    "category": "Reading",
    "difficulty": 2,
    "passage": "Jisu wants to be a famous baseball player. He practices very hard.",
    "passage_id": "P002",
    "question_text": "위 문장에서 'to be'의 해석으로 가장 적절한 것은?",
    "options": ["되는 것", "되기 위해", "된다면", "되어서"],
    "correct_answer": "되는 것",
    "tags": ["grm_infinitive", "read_grammar"],
    "explanation": "want의 목적어 자리이므로 '~하는 것'으로 해석합니다.",
    "wrong_feedback": {
      "되기 위해": "목적어 자리가 아니면 '~하기 위해'가 맞지만, want 뒤는 목적어야.",
      "된다면": "if절이 아니야.",
      "되어서": "감정의 원인이 아니야."
    }
  },
  {
    "id": 14,
    "category": "Reading",
    "difficulty": 2,
    "passage_id": "P002",
    "question_text": "Jisu는 야구 선수가 되기 위해 무엇을 하나요?",
    "options": ["TV를 본다", "열심히 연습한다", "잠을 많이 잔다", "맛있는 걸 먹는다"],
    "correct_answer": "열심히 연습한다",
    "tags": ["read_detail", "read_inference"],
    "explanation": "'practices very hard'라고 했습니다.",
    "wrong_feedback": {
      "TV를 본다": "practices는 '연습하다'라는 뜻이야.",
      "잠을 많이 잔다": "잠에 대한 이야기는 없어.",
      "맛있는 걸 먹는다": "음식 이야기도 없어."
    }
  },
  {
    "id": 15,
    "category": "Grammar",
    "difficulty": 2,
    "question_text": "빈칸에 알맞은 말은? 'I have no friends _____ with.'",
    "options": ["play", "to play", "playing", "played"],
    "correct_answer": "to play",
    "tags": ["grm_infinitive", "grm_adj_usage"],
    "explanation": "명사(friends)를 뒤에서 꾸며주는 형용사적 용법(to play)이 필요합니다.",
    "wrong_feedback": {
      "play": "동사 두 개가 겹치면 안 돼.",
      "playing": "여기서는 '~할 친구'라는 미래/가능성의 의미라 to부정사가 어울려."
    }
  },
  {
    "id": 16,
    "category": "Grammar",
    "difficulty": 2,
    "question_text": "현재완료 시제가 사용된 문장은?",
    "options": ["I lost my bag.", "I have lost my bag.", "I was losing my bag.", "I will lose my bag."],
    "correct_answer": "I have lost my bag.",
    "tags": ["grm_tense", "grm_present_perfect"],
    "explanation": "have + p.p. 형태가 현재완료입니다.",
    "wrong_feedback": {
      "I lost my bag.": "이건 그냥 과거형이야. 지금 가방을 찾았는지 아닌지 몰라.",
      "I was losing my bag.": "이건 과거 진행형이야.",
      "I will lose my bag.": "이건 미래형이야."
    }
  },
  {
    "id": 17,
    "category": "Grammar",
    "difficulty": 2,
    "question_text": "다음 문장을 수동태로 바르게 고친 것은? 'Jane wrote the letter.'",
    "options": ["The letter wrote by Jane.", "The letter was written by Jane.", "The letter is written by Jane.", "The letter written by Jane."],
    "correct_answer": "The letter was written by Jane.",
    "tags": ["grm_passive", "grm_tense"],
    "explanation": "과거 시제이므로 'was + written(p.p.)' 형태가 되어야 합니다.",
    "wrong_feedback": {
      "The letter wrote by Jane.": "be동사가 빠졌어. 수동태는 'be + p.p.'야.",
      "The letter is written by Jane.": "원래 문장이 wrote(과거)니까 is가 아니라 was를 써야 해."
    }
  },
  {
    "id": 18,
    "category": "Grammar",
    "difficulty": 2,
    "question_text": "빈칸에 들어갈 관계대명사는? 'Look at the boy _____ is running.'",
    "options": ["who", "which", "whose", "whom"],
    "correct_answer": "who",
    "tags": ["grm_relative", "grm_subjective"],
    "explanation": "선행사가 사람(boy)이고 뒤에 동사가 오므로 주격 관계대명사 who가 맞습니다.",
    "wrong_feedback": {
      "which": "사람한테는 which를 안 써.",
      "whom": "뒤에 주어가 아니라 동사(is)가 바로 나왔으니 '주격'이 필요해. whom은 목적격이야.",
      "whose": "소유격 자리(의)가 아니야."
    }
  },
  {
    "id": 19,
    "category": "Grammar",
    "difficulty": 2,
    "question_text": "5형식 동사: 'Mom asked me _____ my room.'",
    "options": ["clean", "cleaning", "to clean", "cleaned"],
    "correct_answer": "to clean",
    "tags": ["syn_5form", "syn_verb"],
    "explanation": "ask는 목적격 보어로 to부정사를 취하는 동사입니다.",
    "wrong_feedback": {
      "clean": "동사원형만 쓰면 안 돼. ask는 뒤에 to를 원해!",
      "cleaning": "동명사는 ask랑 안 어울려.",
      "cleaned": "과거분사? 여기선 아니야."
    }
  },
  {
    "id": 20,
    "category": "Grammar",
    "difficulty": 3,
    "question_text": "간접의문문 순서가 바른 것은? 'I don't know _____.'",
    "options": ["where is he", "where he is", "where does he is", "where he be"],
    "correct_answer": "where he is",
    "tags": ["grm_indirect_q", "syn_word_order"],
    "explanation": "간접의문문은 '의문사 + 주어 + 동사' 순서입니다.",
    "wrong_feedback": {
      "where is he": "이건 직접 물어볼 때 쓰는 순서야. 문장 중간에 들어갈 땐 '의+주+동'!",
      "where does he is": "be동사가 있는데 do/does를 또 쓰면 안 돼."
    }
  }
];