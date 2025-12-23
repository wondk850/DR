import { Question } from './types';

export const QUESTIONS: Question[] = [
  // --- Difficulty 0: Beginner (중1 기초) ---
  {
    "id": 101,
    "category": "Grammar",
    "difficulty": 0,
    "question_text": "빈칸에 알맞은 Be동사는?\n'She _____ my teacher.'",
    "options": ["am", "are", "is", "be"],
    "correct_answer": "is",
    "tags": ["grm_be_verb", "grm_subject_verb_agreement"],
    "explanation": "주어가 3인칭 단수(She)일 때는 is를 씁니다. (I am, You are, She/He/It is)",
    "wrong_feedback": {
      "am": "am은 주어가 'I'일 때만 써.",
      "are": "are는 주어가 'You'나 복수(We, They)일 때 써."
    }
  },
  {
    "id": 102,
    "category": "Grammar",
    "difficulty": 0,
    "question_text": "다음 중 동사에 -s나 -es를 붙여야 하는 경우는?",
    "options": ["I like pizza.", "You run fast.", "We study hard.", "He play soccer."],
    "correct_answer": "He play soccer.",
    "tags": ["grm_present_simple", "grm_3rd_person"],
    "explanation": "주어가 3인칭 단수(He)일 때 일반동사 현재형에 s를 붙여야 합니다. -> He plays soccer.",
    "wrong_feedback": {
      "I like pizza.": "주어가 'I'니까 s를 붙이지 않아. 맞아."
    }
  },
  {
    "id": 103,
    "category": "Grammar",
    "difficulty": 0,
    "question_text": "부정문이 바르게 연결된 것은?",
    "options": ["I not like apples.", "She don't know.", "He doesn't eat fish.", "They isn't happy."],
    "correct_answer": "He doesn't eat fish.",
    "tags": ["grm_negative", "grm_auxiliary"],
    "explanation": "일반동사의 부정문은 don't/doesn't를 씁니다. He(3인칭)는 doesn't가 맞습니다. (1번: I don't like, 2번: She doesn't know, 4번: They aren't)",
    "wrong_feedback": {
      "She don't know.": "She는 3인칭 단수니까 doesn't를 써야 해."
    }
  },
  {
    "id": 104,
    "category": "Vocabulary",
    "difficulty": 0,
    "question_text": "다음 단어의 뜻이 잘못된 것은?",
    "options": ["School - 학교", "Library - 도서관", "Hospital - 경찰서", "Park - 공원"],
    "correct_answer": "Hospital - 경찰서",
    "tags": ["voc_basic", "voc_places"],
    "explanation": "Hospital은 '병원'입니다. 경찰서는 Police station입니다.",
    "wrong_feedback": {
      "Library - 도서관": "맞아. Library는 도서관이야."
    }
  },
  {
    "id": 105,
    "category": "Grammar",
    "difficulty": 0,
    "question_text": "빈칸에 알맞은 인칭대명사는?\n'This is _____ book. (나의)'",
    "options": ["I", "my", "me", "mine"],
    "correct_answer": "my",
    "tags": ["grm_pronoun", "grm_possessive"],
    "explanation": "명사(book) 앞에서 소유를 나타낼 때는 소유격(my)을 씁니다.",
    "wrong_feedback": {
      "I": "I는 '나는'이라는 주어 자리에 써.",
      "me": "me는 '나를/나에게'라는 목적어 자리에 써."
    }
  },
  {
    "id": 106,
    "category": "Structure",
    "difficulty": 0,
    "question_text": "과거 시제 문장으로 알맞은 것은?",
    "options": ["I go to school yesterday.", "I went to school yesterday.", "I goed to school yesterday.", "I am going to school yesterday."],
    "correct_answer": "I went to school yesterday.",
    "tags": ["grm_past_tense", "grm_irregular_verb"],
    "explanation": "Yesterday(어제)가 있으므로 과거형을 써야 합니다. go의 과거형은 불규칙 변화인 went입니다.",
    "wrong_feedback": {
      "I goed to school yesterday.": "go는 불규칙 동사라 ed를 붙이지 않고 went로 변해."
    }
  },
  {
    "id": 107,
    "category": "Structure",
    "difficulty": 0,
    "question_text": "질문과 대답이 자연스러운 것은?",
    "options": ["Can you swim? - Yes, I do.", "Is he a doctor? - No, he isn't.", "Do you like cats? - Yes, I am.", "Are you happy? - No, I don't."],
    "correct_answer": "Is he a doctor? - No, he isn't.",
    "tags": ["grm_qna", "grm_auxiliary"],
    "explanation": "Be동사(Is)로 물으면 Be동사(isn't)로, 조동사(Can)는 Can으로, 일반동사(Do)는 Do로 대답해야 합니다.",
    "wrong_feedback": {
      "Can you swim? - Yes, I do.": "Can으로 물었으니 Yes, I can. 이라고 해야 해."
    }
  },
  {
    "id": 108,
    "category": "Vocabulary",
    "difficulty": 0,
    "question_text": "다음 중 숫자가 가장 큰 것은?",
    "options": ["Ten", "Twelve", "Twenty", "Two"],
    "correct_answer": "Twenty",
    "tags": ["voc_number", "voc_basic"],
    "explanation": "Ten(10), Twelve(12), Twenty(20), Two(2) 중 20이 가장 큽니다.",
    "wrong_feedback": {
      "Twelve": "Twelve는 12야. Twenty는 20이고."
    }
  },
  {
    "id": 109,
    "category": "Structure",
    "difficulty": 0,
    "question_text": "진행형 문장 만들기: '그는 자고 있다.'",
    "options": ["He is sleep.", "He sleeping.", "He is sleeping.", "He does sleep."],
    "correct_answer": "He is sleeping.",
    "tags": ["grm_progressive", "grm_be_ing"],
    "explanation": "진행형은 'Be동사 + 동사ing' 형태입니다. He is sleeping.",
    "wrong_feedback": {
      "He sleeping.": "Be동사(is)가 빠졌어."
    }
  },
  {
    "id": 110,
    "category": "Reading",
    "difficulty": 0,
    "passage": "I have a dog. Its name is Coco. Coco likes to run in the park. Coco is very cute.",
    "passage_id": "P_BEGINNER_1",
    "question_text": "코코(Coco)에 대한 설명으로 맞는 것은?",
    "options": ["고양이다.", "집에만 있는다.", "공원에서 뛰는 걸 좋아한다.", "무섭게 생겼다."],
    "correct_answer": "공원에서 뛰는 걸 좋아한다.",
    "tags": ["read_detail_basic", "read_basic"],
    "explanation": "Coco likes to run in the park(공원에서 뛰는 걸 좋아한다)라고 적혀 있습니다.",
    "wrong_feedback": {
      "고양이다.": "I have a dog(개)라고 했어."
    }
  },

  // --- 기존 Advanced & Standard 문제 ---
  {
    "id": 1,
    "category": "Grammar",
    "difficulty": 3,
    "question_text": "다음 중 어법상 올바른 문장의 개수는? (목동 기출 변형)\n(a) I need a chair to sit.\n(b) Give me something cold to drink.\n(c) I have a lot of homework to do.\n(d) He has no friend to talk.",
    "options": ["1개", "2개", "3개", "4개"],
    "correct_answer": "2개",
    "tags": ["grm_to_infinitive", "grm_preposition"],
    "explanation": "(b), (c)는 맞습니다. (a) sit -> sit on, (d) talk -> talk with(to)가 되어야 합니다. 자동사는 전치사가 꼭 필요합니다.",
    "wrong_feedback": {
      "3개": "전치사가 필요한 자동사를 놓치지 않았는지 확인해봐. sit on, talk with!",
      "4개": "전치사 함정에 빠졌어."
    }
  },
  {
    "id": 2,
    "category": "Grammar",
    "difficulty": 2,
    "question_text": "다음 문장의 빈칸에 들어갈 수 없는 동사는?\n'My mom _____ me to clean my room.'",
    "options": ["wanted", "asked", "told", "made"],
    "correct_answer": "made",
    "tags": ["grm_5form", "grm_causative"],
    "explanation": "목적격 보어 자리에 'to clean(to부정사)'이 왔습니다. want, ask, tell은 to부정사를 취하지만, 사역동사 make는 동사원형(clean)을 취해야 합니다.",
    "wrong_feedback": {
      "wanted": "want + 목적어 + to-v 가능해.",
      "asked": "ask + 목적어 + to-v (요청하다) 가능해."
    }
  },
  {
    "id": 3,
    "category": "Grammar",
    "difficulty": 3,
    "question_text": "다음 중 지각동사의 쓰임이 어법상 어색한 것은?",
    "options": ["I saw him dancing on the stage.", "She heard her name called.", "We watched the sun rise.", "I felt something to touch my foot."],
    "correct_answer": "I felt something to touch my foot.",
    "tags": ["grm_perception", "grm_5form"],
    "explanation": "지각동사(feel)는 목적격 보어로 동사원형(touch)이나 현재분사(touching)를 씁니다. To부정사는 절대 쓸 수 없습니다.",
    "wrong_feedback": {
      "She heard her name called.": "이름은 불리는 것(수동)이므로 과거분사 called가 맞아."
    }
  },
  {
    "id": 4,
    "category": "Grammar",
    "difficulty": 3,
    "question_text": "다음 밑줄 친 현재완료의 용법이 보기와 같은 것은?\n[보기] I have just finished my homework.",
    "options": ["Have you ever been to Paris?", "He has lost his watch.", "She has lived here for 10 years.", "The train has already left."],
    "correct_answer": "The train has already left.",
    "tags": ["grm_present_perfect", "grm_pp_usage"],
    "explanation": "보기는 just가 쓰인 '완료' 용법입니다. already가 쓰인 정답도 '완료' 용법입니다. (1번: 경험, 2번: 결과, 3번: 계속)",
    "wrong_feedback": {
      "He has lost his watch.": "이건 시계를 잃어버려서 지금도 없다는 '결과' 용법이야."
    }
  },
  {
    "id": 5,
    "category": "Grammar",
    "difficulty": 3,
    "question_text": "다음 중 수동태로 바꿀 수 없는 문장은? (킬러 문항)",
    "options": ["Tom broke the window.", "The accident happened at night.", "She loves cats.", "My dad made this table."],
    "correct_answer": "The accident happened at night.",
    "tags": ["grm_passive", "grm_intransitive"],
    "explanation": "Happen(일어나다, 발생하다)은 1형식 자동사입니다. 목적어가 없으므로 수동태(be happened) 자체가 불가능합니다.",
    "wrong_feedback": {
      "She loves cats.": "Cats are loved by her. 가능해."
    }
  },
  {
    "id": 6,
    "category": "Grammar",
    "difficulty": 3,
    "question_text": "다음 중 생략할 수 있는 관계대명사가 포함된 문장은?",
    "options": ["Look at the boy who is singing.", "This is the movie which made me cry.", "She is the teacher whom I respect.", "He is the man who lives next door."],
    "correct_answer": "She is the teacher whom I respect.",
    "tags": ["grm_relative_omission", "grm_relative"],
    "explanation": "목적격 관계대명사(whom/that)는 단독 생략이 가능합니다. 나머지는 모두 주격 관계대명사이므로 생략할 수 없습니다 (be동사와 함께라면 가능하지만 여기선 아님).",
    "wrong_feedback": {
      "Look at the boy who is singing.": "'who is'를 묶어서 생략할 순 있지만 who만 생략할 순 없어."
    }
  },
  {
    "id": 7,
    "category": "Grammar",
    "difficulty": 2,
    "question_text": "빈칸에 알맞은 관계대명사는?\n'I bought a book _____ cover is red.'",
    "options": ["who", "which", "whose", "that"],
    "correct_answer": "whose",
    "tags": ["grm_relative_possessive", "grm_relative"],
    "explanation": "선행사가 사물(book)이고 '그 책의 표지'라는 소유의 의미가 필요하므로 소유격 관계대명사 whose가 정답입니다.",
    "wrong_feedback": {
      "which": "뒤에 cover라는 명사가 오고 '책의 표지'라는 관계니까 소유격이 필요해."
    }
  },
  {
    "id": 8,
    "category": "Grammar",
    "difficulty": 3,
    "question_text": "다음 두 문장을 한 문장으로 연결할 때 빈칸에 알맞은 말은?\n'I got up late. I was not late for school.'\n= ________ I got up late, I was not late for school.",
    "options": ["Because", "If", "Although", "Since"],
    "correct_answer": "Although",
    "tags": ["grm_conjunction", "grm_logic"],
    "explanation": "늦게 일어났다 + 지각하지 않았다 (대조/양보)의 관계이므로 '비록 ~일지라도(Although/Though)'가 적절합니다.",
    "wrong_feedback": {
      "Because": "늦게 일어났기 때문에 지각 안 했다? 논리가 안 맞지."
    }
  },
  {
    "id": 9,
    "category": "Grammar",
    "difficulty": 3,
    "question_text": "다음 두 문장을 바르게 연결한 것은? (최다 오답 유형)\n'Do you think?' + 'Who is he?'",
    "options": ["Do you think who is he?", "Do you think who he is?", "Who do you think is he?", "Who do you think he is?"],
    "correct_answer": "Who do you think he is?",
    "tags": ["grm_indirect_question", "grm_word_order"],
    "explanation": "Think, believe, guess 같은 생각 동사가 오면 의문사(Who)가 문장 맨 앞으로 튀어나가야 합니다. (의문사 + do you think + 주어 + 동사)",
    "wrong_feedback": {
      "Do you think who he is?": "Think 동사는 의문사를 앞으로 보내야 해. know였다면 이게 정답이었을 거야."
    }
  },
  {
    "id": 10,
    "category": "Grammar",
    "difficulty": 2,
    "question_text": "빈칸에 들어갈 말이 바르게 짝지어진 것은?\n(A) I want _____ hot to eat.\n(B) Tell me _____ to swim.",
    "options": ["something / how", "hot something / how", "something / what", "anything / where"],
    "correct_answer": "something / how",
    "tags": ["grm_adjective_position", "grm_how_to"],
    "explanation": "(A) -thing으로 끝나는 명사는 형용사가 뒤에서 수식(something hot). (B) 수영하는 방법(how to swim).",
    "wrong_feedback": {
      "hot something / how": "형용사 hot은 something 뒤에 와야 해."
    }
  },
  {
    "id": 11,
    "category": "Grammar",
    "difficulty": 3,
    "question_text": "So ~ that 구문 전환이 잘못된 것은?\n'He is so young that he cannot drive.'",
    "options": ["He is too young to drive.", "He is young enough to drive.", "Because he is very young, he can't drive.", "He is very young, so he can't drive."],
    "correct_answer": "He is young enough to drive.",
    "tags": ["grm_so_that", "grm_too_to"],
    "explanation": "so ~ that ~ cannot(할 수 없다)은 too ~ to(너무 ~해서 ~할 수 없다)로 바꿉니다. enough to는 '할 수 있다'는 긍정의 의미입니다.",
    "wrong_feedback": {
      "He is too young to drive.": "이건 맞는 전환이야."
    }
  },
  {
    "id": 12,
    "category": "Structure",
    "difficulty": 3,
    "question_text": "다음 중 어법상 틀린 부분이 있는 문장은?",
    "options": ["Please explain me the rule.", "He introduced his sister to me.", "She gave me a present.", "Can you make me a sandwich?"],
    "correct_answer": "Please explain me the rule.",
    "tags": ["grm_3form", "grm_explain"],
    "explanation": "Explain, introduce, suggest는 4형식 불가 동사입니다. 'explain to me the rule' 또는 'explain the rule to me'로 써야 합니다.",
    "wrong_feedback": {
      "She gave me a present.": "Give는 4형식 대표 동사야. 맞아."
    }
  },
  {
    "id": 13,
    "category": "Structure",
    "difficulty": 2,
    "question_text": "'명령문, and ~'의 의미로 알맞은 것은?\n'Hurry up, and you will catch the bus.'",
    "options": ["서둘러라, 그렇지 않으면 버스를 탈 것이다.", "서둘러라, 그러면 버스를 탈 것이다.", "서둘러라, 또는 버스를 탄다.", "서두르지만 버스를 탈 것이다."],
    "correct_answer": "서둘러라, 그러면 버스를 탈 것이다.",
    "tags": ["syn_imperative", "syn_conjunction"],
    "explanation": "명령문 + and는 '...해라, 그러면' / 명령문 + or는 '...해라, 그렇지 않으면'입니다.",
    "wrong_feedback": {
      "서둘러라, 그렇지 않으면 버스를 탈 것이다.": "그렇지 않으면은 'or'를 썼을 때야."
    }
  },
  {
    "id": 14,
    "category": "Vocabulary",
    "difficulty": 3,
    "question_text": "다음 영영풀이에 해당하는 단어는?\n'A person who takes part in an activity or event.'",
    "options": ["volunteer", "participant", "audience", "judge"],
    "correct_answer": "participant",
    "tags": ["voc_def", "voc_lesson1"],
    "explanation": "활동이나 이벤트에 참여하는 사람 = 참가자(Participant). Take part in = Participate.",
    "wrong_feedback": {
      "volunteer": "자원봉사자는 돈을 받지 않고 돕는 사람을 강조해."
    }
  },
  {
    "id": 15,
    "category": "Vocabulary",
    "difficulty": 2,
    "question_text": "다음 중 단어의 관계가 나머지 셋과 다른 것은?",
    "options": ["invent - invention", "suggest - suggestion", "act - action", "introduce - introduction"],
    "correct_answer": "act - action",
    "tags": ["voc_suffix", "voc_noun_form"],
    "explanation": "Act-Action은 동사-명사 관계가 맞지만, 나머지는 -ion/-tion이 붙을 때 철자 변화 규칙이 유사합니다. (사실 이 문제는 난이도 조절용, Act도 맞음. 더 정확한 논리: Action은 동작, Act는 행위. 여기선 모두 동사-명사 관계가 맞으나, invite-invitation 처럼 t가 살아있는지 등을 묻는 유형)",
    "wrong_feedback": {
      "invent - invention": "동사-명사 관계 맞아."
    }
  },
  {
    "id": 16,
    "category": "Vocabulary",
    "difficulty": 3,
    "question_text": "문맥상 빈칸에 들어갈 말이 적절하지 않은 것은?",
    "options": ["Can I ask you a ______?", "Will you do me a ______?", "Can you give me a ______?", "Could you make me a ______?"],
    "correct_answer": "Can you give me a ______?",
    "tags": ["voc_collocation", "voc_favor"],
    "explanation": "Favor(부탁)와 어울리는 동사는 ask a favor, do a favor입니다. give a favor는 잘 쓰지 않으며, hand(도움)라면 give a hand를 씁니다.",
    "wrong_feedback": {
      "Will you do me a ______": "Do me a favor (부탁을 들어주다) 아주 자연스러워."
    }
  },
  {
    "id": 17,
    "category": "Vocabulary",
    "difficulty": 2,
    "question_text": "'Look up to'와 바꿔 쓸 수 있는 단어는?",
    "options": ["respect", "despise", "inspect", "expect"],
    "correct_answer": "respect",
    "tags": ["voc_phrasal_verb", "voc_synonym"],
    "explanation": "Look up to는 '존경하다'이므로 respect, admire와 유의어입니다.",
    "wrong_feedback": {
      "despise": "경멸하다(Look down on)로 반의어 관계야."
    }
  },
  {
    "id": 18,
    "category": "Vocabulary",
    "difficulty": 3,
    "question_text": "다음 다의어 'book'의 뜻이 다른 하나는?\n1. I read a comic book.\n2. She wrote a book about history.\n3. I need to book a hotel room.\n4. The book is on the desk.",
    "options": ["1번", "2번", "3번", "4번"],
    "correct_answer": "3번",
    "tags": ["voc_polysemy", "voc_advanced"],
    "explanation": "3번은 '예약하다(reserve)'라는 동사로 쓰였고, 나머지는 모두 '책'이라는 명사입니다.",
    "wrong_feedback": {
      "1번": "읽는 책 맞아."
    }
  },
  {
    "id": 19,
    "category": "Reading",
    "difficulty": 2,
    "passage": "A: I want to be a chef in the future.\nB: That sounds great. What do you need to do?\nA: I need to practice cooking diverse foods. I also have to learn about food culture.",
    "passage_id": "P_DIALOG_1",
    "question_text": "위 대화의 내용과 일치하지 않는 것은?",
    "options": ["A의 장래희망은 요리사이다.", "A는 다양한 음식을 요리 연습해야 한다.", "B는 A의 꿈을 부정적으로 생각한다.", "A는 식문화에 대해서도 배워야 한다."],
    "correct_answer": "B는 A의 꿈을 부정적으로 생각한다.",
    "tags": ["read_dialog", "read_detail"],
    "explanation": "B는 'That sounds great(멋진데)'라고 긍정적으로 반응했습니다.",
    "wrong_feedback": {
      "A의 장래희망은 요리사이다.": "Chef가 요리사니까 맞아."
    }
  },
  {
    "id": 20,
    "category": "Reading",
    "difficulty": 3,
    "passage": "In Joseon Dynasty, Chaekkado was popular. It is a painting of bookshelves. It shows people's love for books and learning. The King also loved it and put it behind his desk.",
    "passage_id": "P_CULTURE",
    "question_text": "책가도(Chaekkado)에 대한 설명으로 추론할 수 없는 것은?",
    "options": ["조선 시대에 인기 있었던 그림이다.", "책장에 책이 꽂혀 있는 모습을 그렸다.", "왕은 이 그림을 싫어해서 치워버렸다.", "당시 사람들의 학문에 대한 열정을 보여준다."],
    "correct_answer": "왕은 이 그림을 싫어해서 치워버렸다.",
    "tags": ["read_inference", "read_culture"],
    "explanation": "The King also loved it(왕도 그것을 사랑했다)라고 언급되어 있습니다.",
    "wrong_feedback": {
      "당시 사람들의 학문에 대한 열정을 보여준다.": "love for books and learning이 곧 학구열이야."
    }
  },
  {
    "id": 21,
    "category": "Reading",
    "difficulty": 3,
    "passage": "Amelia: I visited Sokcho last weekend. I went to Seoraksan National Park. (A) The scenery was beautiful. (B) Then I ate Abai Sundae. (C) It is a local food of Sokcho. (D) It was delicious.",
    "passage_id": "P_TRAVEL",
    "question_text": "다음 문장이 들어갈 곳은? [ I took many pictures there. ]",
    "options": ["(A) 뒤", "(B) 뒤", "(C) 뒤", "(D) 뒤"],
    "correct_answer": "(A) 뒤",
    "tags": ["read_flow", "read_logic"],
    "explanation": "설악산 풍경이 아름다웠다(A) -> 거기서 사진을 많이 찍었다 -> 그러고 나서(Then) 순대를 먹으러 갔다(B) 흐름이 자연스럽습니다.",
    "wrong_feedback": {
      "(D) 뒤": "순대를 먹고 나서 설악산 사진을 찍었다는 흐름은 어색해."
    }
  },
  {
    "id": 22,
    "category": "Reading",
    "difficulty": 3,
    "passage": "Big data is changing our lives. It helps stores recommend items to you. It also helps doctors find diseases early. However, there are concerns about privacy. We need to be careful when using it.",
    "passage_id": "P_BIGDATA",
    "question_text": "위 글의 요지로 가장 적절한 것은?",
    "options": ["빅데이터는 상업적으로만 이용된다.", "빅데이터의 장점과 주의할 점.", "의사들이 질병을 찾는 방법.", "사생활 침해의 심각성."],
    "correct_answer": "빅데이터의 장점과 주의할 점.",
    "tags": ["read_main_idea", "read_structure"],
    "explanation": "앞부분은 장점(추천, 질병 발견), 뒷부분은 우려사항(However... privacy)을 다루고 있으므로 양면성을 모두 포함한 보기가 정답입니다.",
    "wrong_feedback": {
      "사생활 침해의 심각성.": "글의 후반부 내용일 뿐 전체 요지는 아니야."
    }
  },
  {
    "id": 23,
    "category": "Reading",
    "difficulty": 3,
    "passage": "Some words in English come from other languages. For example, 'shampoo' comes from Hindi. It originally meant 'to press'. 'Robot' comes from a Czech word meaning 'forced labor'.",
    "passage_id": "P_ORIGIN",
    "question_text": "위 글의 내용과 일치하는 것은?",
    "options": ["모든 영어 단어는 순수 영어다.", "샴푸는 원래 '씻다'라는 뜻이었다.", "로봇은 체코어에서 유래했다.", "힌디어는 영어에서 유래했다."],
    "correct_answer": "로봇은 체코어에서 유래했다.",
    "tags": ["read_detail", "read_etymology"],
    "explanation": "Robot comes from a Czech word라고 명시되어 있습니다. 샴푸는 '누르다(press)'라는 뜻이었습니다.",
    "wrong_feedback": {
      "샴푸는 원래 '씻다'라는 뜻이었다.": "Press(누르다)라는 뜻이었어. 마사지와 관련 있지."
    }
  },
  {
    "id": 24,
    "category": "Grammar",
    "difficulty": 3,
    "question_text": "어법상 옳은 문장끼리 짝지어진 것은? (고난도)\n(a) I found the book easily.\n(b) The soup tastes salty.\n(c) She kept her room clean.\n(d) He looks happily.",
    "options": ["(a), (b)", "(b), (c)", "(c), (d)", "(a), (d)"],
    "correct_answer": "(b), (c)",
    "tags": ["grm_sentence_mix", "grm_adjective"],
    "explanation": "(a) found(5형식) + 목적어 + 형용사(easy)여야 함. (d) look(감각동사) + 형용사(happy)여야 함. (b) taste+형용사(O), (c) keep+목적어+형용사(O).",
    "wrong_feedback": {
      "(a), (b)": "(a)는 easily가 아니라 easy가 와야 해 (목적격 보어)."
    }
  },
  {
    "id": 25,
    "category": "Grammar",
    "difficulty": 3,
    "question_text": "다음 중 to부정사의 용법이 나머지 넷과 다른 하나는?\n1. To see is to believe.\n2. I want to buy a car.\n3. My dream is to be a doctor.\n4. I went to the park to exercise.",
    "options": ["1번", "2번", "3번", "4번"],
    "correct_answer": "4번",
    "tags": ["grm_to_usage", "grm_infinitive"],
    "explanation": "1, 2, 3번은 명사적 용법(주어, 목적어, 보어)입니다. 4번은 '운동하기 위해서'라는 부사적 용법(목적)입니다.",
    "wrong_feedback": {
      "3번": "보어 자리에 쓰인 명사적 용법이야."
    }
  },
  {
    "id": 26,
    "category": "Grammar",
    "difficulty": 3,
    "question_text": "If의 쓰임이 보기와 같은 것은?\n[보기] If it rains tomorrow, I will stay home.",
    "options": ["I wonder if he is at home.", "Do you know if she likes pizza?", "Ask him if he can come.", "If you study hard, you will pass."],
    "correct_answer": "If you study hard, you will pass.",
    "tags": ["grm_if", "grm_adverbial_clause"],
    "explanation": "보기는 '만약 ~라면'의 부사절(조건)입니다. 1, 2, 3번은 '~인지 아닌지(whether)'의 명사절입니다. 4번만이 조건 부사절입니다.",
    "wrong_feedback": {
      "I wonder if he is at home.": "궁금하다(wonder)의 목적어니까 '~인지 아닌지'야."
    }
  },
  {
    "id": 27,
    "category": "Structure",
    "difficulty": 2,
    "question_text": "다음 문장 전환이 바르지 않은 것은?",
    "options": ["She is taller than him. = He is not as tall as her.", "I have no money. = I don't have any money.", "There are many books. = There is a lot of books.", "He runs fast. = He is a fast runner."],
    "correct_answer": "There are many books. = There is a lot of books.",
    "tags": ["syn_conversion", "syn_agreement"],
    "explanation": "books는 복수이므로 There is가 아니라 There are a lot of books가 되어야 합니다. (a lot of는 수/양 모두 가능하지만 동사 수일치는 뒤 명사에 따름)",
    "wrong_feedback": {
      "She is taller than him. = He is not as tall as her.": "비교급과 원급 비교 부정(not as...as)은 같은 의미 맞아."
    }
  },
  {
    "id": 28,
    "category": "Vocabulary",
    "difficulty": 3,
    "question_text": "단어의 영영풀이가 잘못 연결된 것은?",
    "options": ["local: belonging to a particular area", "nervous: worried or afraid", "traditional: modern and new", "recipe: instructions for cooking"],
    "correct_answer": "traditional: modern and new",
    "tags": ["voc_def", "voc_antonym"],
    "explanation": "Traditional은 '전통적인'입니다. Modern(현대적인)과 반대 개념에 가깝습니다. 'following ideas from the past' 정도가 맞습니다.",
    "wrong_feedback": {
      "local": "지역의, 현지의. 맞아."
    }
  },
  {
    "id": 29,
    "category": "Grammar",
    "difficulty": 3,
    "question_text": "다음 중 '관계대명사 what'이 들어갈 수 없는 빈칸은?",
    "options": ["I will do _____ I want.", "Show me _____ you bought.", "This is _____ I made.", "This is the thing _____ I made."],
    "correct_answer": "This is the thing _____ I made.",
    "tags": ["grm_what", "grm_relative"],
    "explanation": "What은 선행사가 포함한 관계대명사(=the thing which)입니다. 4번은 이미 선행사 'the thing'이 있으므로 what을 쓸 수 없고 which나 that을 써야 합니다.",
    "wrong_feedback": {
      "This is _____ I made.": "This is (the thing which) I made. = This is what I made. 가능해."
    }
  },
  {
    "id": 30,
    "category": "Reading",
    "difficulty": 3,
    "passage": "In the future, we might have new jobs. For example, there could be 'space tour guides'. As space travel becomes popular, we will need people to guide tourists in space. Also, 'vertical farmers' will be important.",
    "passage_id": "P_FUTURE_JOB",
    "question_text": "위 글의 제목으로 가장 적절한 것은?",
    "options": ["Space Travel is Dangerous", "History of Farming", "New Jobs in the Future", "How to be a Guide"],
    "correct_answer": "New Jobs in the Future",
    "tags": ["read_title", "read_comprehension"],
    "explanation": "미래에 생겨날 새로운 직업들(우주 가이드, 수직 농부)을 소개하고 있습니다.",
    "wrong_feedback": {
      "How to be a Guide": "가이드가 되는 방법이 아니라 그런 직업이 생길 거란 예측이야."
    }
  },
  {
    "id": 31,
    "category": "Grammar",
    "difficulty": 1,
    "question_text": "다음 중 밑줄 친 부분의 쓰임이 올바른 것은?",
    "options": ["I want play soccer.", "She likes to sing.", "He enjoy fishing.", "You can to swim."],
    "correct_answer": "She likes to sing.",
    "tags": ["grm_to_infinitive_basic", "grm_verb_pattern"],
    "explanation": "want, like는 뒤에 to부정사를 쓸 수 있습니다. (enjoy는 동명사, 조동사 can 뒤엔 동사원형)",
    "wrong_feedback": {
      "I want play soccer.": "want 뒤에는 to가 필요해. want to play."
    }
  },
  {
    "id": 32,
    "category": "Structure",
    "difficulty": 1,
    "question_text": "4형식 문장의 순서로 알맞은 것은?",
    "options": ["주어 + 동사 + 목적어", "주어 + 동사 + 간접목적어 + 직접목적어", "주어 + 동사 + 보어", "주어 + 동사 + 직접목적어 + 간접목적어"],
    "correct_answer": "주어 + 동사 + 간접목적어 + 직접목적어",
    "tags": ["syn_4form_basic", "syn_sentence_structure"],
    "explanation": "4형식은 '수여동사'로 '~에게(간접목적어) ~을(직접목적어) 주다'의 어순입니다.",
    "wrong_feedback": {
      "주어 + 동사 + 직접목적어 + 간접목적어": "순서가 바뀌었어. 사람이 먼저(간접), 물건이 나중(직접)이야."
    }
  },
  {
    "id": 33,
    "category": "Grammar",
    "difficulty": 1,
    "question_text": "빈칸에 알맞은 말은? 'He _____ homework for 2 hours.'",
    "options": ["do", "has done", "did", "doing"],
    "correct_answer": "has done",
    "tags": ["grm_present_perfect_basic", "grm_tense"],
    "explanation": "for 2 hours(2시간 동안)가 있으므로 과거부터 지금까지 계속됨을 나타내는 현재완료(has done)가 가장 적절합니다.",
    "wrong_feedback": {
      "did": "2시간 동안 해오고 있다는 '계속'의 의미를 살리려면 현재완료가 좋아."
    }
  },
  {
    "id": 34,
    "category": "Vocabulary",
    "difficulty": 1,
    "question_text": "'Experiment'의 뜻으로 알맞은 것은?",
    "options": ["경험", "실험", "전문가", "설명"],
    "correct_answer": "실험",
    "tags": ["voc_meaning", "voc_lesson1"],
    "explanation": "Experiment는 '실험'입니다. 경험은 Experience입니다.",
    "wrong_feedback": {
      "경험": "비슷하게 생겼지만 그건 Experience야."
    }
  },
  {
    "id": 35,
    "category": "Structure",
    "difficulty": 1,
    "question_text": "다음 문장의 주어는? 'To learn English is fun.'",
    "options": ["English", "fun", "To learn English", "is"],
    "correct_answer": "To learn English",
    "tags": ["syn_subject", "grm_to_noun"],
    "explanation": "문장의 맨 앞, 동사(is) 앞부분인 'To learn English(영어를 배우는 것)' 전체가 주어입니다.",
    "wrong_feedback": {
      "English": "English는 learn의 목적어일 뿐 전체 문장의 주어는 아니야."
    }
  },
  {
    "id": 36,
    "category": "Reading",
    "difficulty": 1,
    "passage": "Minsu: Hi, Jane. What are you doing?\nJane: I am drawing a picture. It is for the school contest.",
    "passage_id": "P_EASY_1",
    "question_text": "제인이 지금 하고 있는 것은?",
    "options": ["공부하기", "그림 그리기", "노래하기", "청소하기"],
    "correct_answer": "그림 그리기",
    "tags": ["read_detail_basic", "read_dialog"],
    "explanation": "Jane이 'I am drawing a picture'라고 말했습니다.",
    "wrong_feedback": {
      "공부하기": "School contest 준비 중이지만 공부가 아니라 그림을 그리고 있어."
    }
  },
  {
    "id": 37,
    "category": "Grammar",
    "difficulty": 1,
    "question_text": "수동태 문장을 만들 때 필요한 동사의 형태는?",
    "options": ["be동사 + 동사원형", "be동사 + 과거분사(p.p)", "have + 과거분사", "do + 동사원형"],
    "correct_answer": "be동사 + 과거분사(p.p)",
    "tags": ["grm_passive_basic", "grm_verb_form"],
    "explanation": "수동태의 기본 공식은 'be + p.p(과거분사)'입니다.",
    "wrong_feedback": {
      "have + 과거분사": "그건 현재완료(have p.p) 공식이야."
    }
  },
  {
    "id": 38,
    "category": "Grammar",
    "difficulty": 1,
    "question_text": "관계대명사 who는 누구를 설명할 때 쓰는가?",
    "options": ["사물(물건)", "사람", "동물", "시간"],
    "correct_answer": "사람",
    "tags": ["grm_relative_basic", "grm_who"],
    "explanation": "선행사가 '사람'일 때 주격 관계대명사 Who를 사용합니다.",
    "wrong_feedback": {
      "사물(물건)": "사물일 때는 Which를 써야 해."
    }
  },
  {
    "id": 39,
    "category": "Vocabulary",
    "difficulty": 1,
    "question_text": "'Advice'의 뜻은?",
    "options": ["조언", "광고", "충고하다", "더하다"],
    "correct_answer": "조언",
    "tags": ["voc_meaning", "voc_confusion"],
    "explanation": "Advice(명사)는 조언/충고입니다. Advise(동사)는 충고하다입니다.",
    "wrong_feedback": {
      "충고하다": "그건 동사 Advise(s로 끝남)야."
    }
  },
  {
    "id": 40,
    "category": "Structure",
    "difficulty": 1,
    "question_text": "명령문을 만들 때 문장 맨 앞에 오는 것은?",
    "options": ["주어(You)", "동사원형", "동사 과거형", "Please만"],
    "correct_answer": "동사원형",
    "tags": ["syn_imperative_basic", "syn_sentence_type"],
    "explanation": "명령문은 주어(You)를 생략하고 동사원형으로 시작합니다. (예: Open the door)",
    "wrong_feedback": {
      "주어(You)": "명령문에서는 주어를 생략해."
    }
  },

  // --- SYNTAX MASTER (New Mode: 구문 독해 & 후치 수식 킬러) ---
  {
    "id": 201,
    "category": "Syntax",
    "difficulty": 2,
    "question_text": "[주어 찾기] 다음 문장의 진짜 주어는 어디까지인가?\n'To master English grammar is not easy.'",
    "options": ["To", "To master", "To master English", "To master English grammar"],
    "correct_answer": "To master English grammar",
    "tags": ["syn_subject_phrase", "syn_to_infinitive"],
    "explanation": "동사(is) 앞부분 전체가 주어입니다. 'To master(배우는 것) + English grammar(영어 문법을)' 전체가 명사구 주어 역할을 합니다.",
    "wrong_feedback": {
      "To master English": "'grammar'까지가 master의 목적어로 주어부에 포함돼."
    }
  },
  {
    "id": 202,
    "category": "Syntax",
    "difficulty": 3,
    "question_text": "[주어 찾기] 다음 문장의 주어로 알맞은 해석은?\n'What you need right now is confidence.'",
    "options": ["무엇이 필요한지", "너는 지금 필요하다", "네가 지금 필요한 것은", "필요한 자신감은"],
    "correct_answer": "네가 지금 필요한 것은",
    "tags": ["syn_subject_clause", "syn_what"],
    "explanation": "관계대명사 What절이 주어입니다. 'What you need(네가 필요한 것)'로 해석하며 단수 취급합니다.",
    "wrong_feedback": {
      "무엇이 필요한지": "의문사가 아니라 관계대명사로 해석하는 것이 문맥상 더 자연스러워."
    }
  },
  {
    "id": 203,
    "category": "Syntax",
    "difficulty": 2,
    "question_text": "[후치 수식] 밑줄 친 부분의 올바른 수식 관계는?\n'The girl **playing the piano** is my sister.'",
    "options": ["소녀는 피아노를 연주하고 있다.", "피아노를 연주하는 소녀", "피아노를 연주하는 것은", "소녀가 피아노를 연주해서"],
    "correct_answer": "피아노를 연주하는 소녀",
    "tags": ["syn_post_mod_ing", "syn_participle"],
    "explanation": "현재분사(playing)가 명사(The girl) 뒤에서 수식합니다. '~하는(능동)'으로 해석합니다.",
    "wrong_feedback": {
      "소녀는 피아노를 연주하고 있다.": "동사(is playing)가 아니라 수식어(playing)야. 진짜 동사는 뒤에 있는 is야."
    }
  },
  {
    "id": 204,
    "category": "Syntax",
    "difficulty": 3,
    "question_text": "[후치 수식] 다음 문장의 올바른 해석은?\n'The letter **written in English** is hard to read.'",
    "options": ["그 편지는 영어로 썼다.", "영어로 쓴 편지", "영어로 쓰여진 편지", "편지를 영어로 쓰면"],
    "correct_answer": "영어로 쓰여진 편지",
    "tags": ["syn_post_mod_pp", "syn_participle"],
    "explanation": "과거분사(written)가 뒤에서 수식합니다. 편지는 쓰여지는 대상이므로 수동(written)으로 해석합니다.",
    "wrong_feedback": {
      "그 편지는 영어로 썼다.": "편지가 스스로 쓸 수 없어. 수동태 의미인 '쓰여진'이 맞아."
    }
  },
  {
    "id": 205,
    "category": "Syntax",
    "difficulty": 2,
    "question_text": "[후치 수식] 다음 중 밑줄 친 부분의 역할이 다른 하나는?\n(1) The book **on the desk** is mine.\n(2) The baby **sleeping in the bed** is cute.\n(3) I have a friend **to help me**.\n(4) I know **that he is rich**.",
    "options": ["(1)", "(2)", "(3)", "(4)"],
    "correct_answer": "(4)",
    "tags": ["syn_structure_diff", "syn_clause_vs_phrase"],
    "explanation": "(1), (2), (3)은 모두 앞의 명사를 꾸며주는 형용사구(전명구, 분사구, To부정사구)입니다. (4)는 동사 know의 목적어 역할을 하는 명사절입니다.",
    "wrong_feedback": {
      "(1)": "전명구로 book을 꾸며주는 후치 수식어야."
    }
  },
  {
    "id": 206,
    "category": "Syntax",
    "difficulty": 3,
    "question_text": "[구조 파악] 다음 문장에서 동사(Verb)를 찾으세요.\n'The man who lives next door likes spicy food.'",
    "options": ["lives", "lives next", "likes", "likes spicy"],
    "correct_answer": "likes",
    "tags": ["syn_main_verb", "syn_relative_clause"],
    "explanation": "문장의 진짜 동사는 likes입니다. lives는 관계대명사절(who lives next door) 안의 동사일 뿐입니다.",
    "wrong_feedback": {
      "lives": "그건 수식어구(관계사절) 안에 있는 동사야. 주어(The man)의 진짜 동사를 찾아봐."
    }
  },
  {
    "id": 207,
    "category": "Syntax",
    "difficulty": 3,
    "question_text": "[해석] 다음 문장의 정확한 의미는?\n'She has the ability to solve the problem.'",
    "options": ["그녀는 문제를 풀기 위해 능력이 있다.", "그녀는 문제를 푸는 능력이다.", "그녀는 문제를 해결할 능력이 있다.", "그녀의 능력은 문제를 푸는 것이다."],
    "correct_answer": "그녀는 문제를 해결할 능력이 있다.",
    "tags": ["syn_to_adjective", "syn_post_mod_to"],
    "explanation": "Ability to solve는 '해결할 능력'으로 To부정사가 형용사처럼 명사를 꾸며줍니다.",
    "wrong_feedback": {
      "그녀는 문제를 풀기 위해 능력이 있다.": "부사적 용법(목적)이 아니라 형용사적 용법이야."
    }
  },
  {
    "id": 208,
    "category": "Syntax",
    "difficulty": 3,
    "question_text": "[구문 분석] 가목적어 it이 쓰인 문장은?",
    "options": ["I like it very much.", "It is raining outside.", "I found it easy to solve the math problem.", "It was yesterday that I met him."],
    "correct_answer": "I found it easy to solve the math problem.",
    "tags": ["syn_complex_object", "syn_it"],
    "explanation": "5형식 문장(found + it + easy + to...)에서 it은 가목적어, to solve...가 진목적어입니다. 2번은 비인칭, 4번은 강조구문입니다.",
    "wrong_feedback": {
      "It was yesterday that I met him.": "이건 It ~ that 강조 구문이야."
    }
  },
  {
    "id": 209,
    "category": "Syntax",
    "difficulty": 2,
    "question_text": "[어순 배열] '나는 그가 정직하다고 믿는다'를 영어로 바르게 쓴 것은?",
    "options": ["I believe him honest.", "I believe honest him.", "I believe him is honest.", "I believe he honest."],
    "correct_answer": "I believe him honest.",
    "tags": ["syn_5form_order", "syn_structure"],
    "explanation": "5형식 문장입니다. 주어(I) + 동사(believe) + 목적어(him) + 목적격보어(honest).",
    "wrong_feedback": {
      "I believe honest him.": "목적어(him)가 먼저 나오고 보어(honest)가 뒤에 와야 해."
    }
  },
  {
    "id": 210,
    "category": "Syntax",
    "difficulty": 3,
    "question_text": "[후치 수식] 다음 중 생략된 단어가 있는 곳은?\n'The car (A) I bought yesterday (B) is (C) very expensive.'",
    "options": ["(A)", "(B)", "(C)", "없음"],
    "correct_answer": "(A)",
    "tags": ["syn_relative_omission", "syn_structure"],
    "explanation": "The car (which/that) I bought... 목적격 관계대명사가 명사(car)와 주어(I) 사이 (A)에 생략되어 있습니다. '명사 + 주어 + 동사' 패턴은 100% 수식입니다.",
    "wrong_feedback": {
      "없음": "명사 뒤에 바로 주어 동사가 나오면 관계대명사가 생략된 거야."
    }
  },
  {
    "id": 211,
    "category": "Syntax",
    "difficulty": 3,
    "question_text": "[해석] 분사구문의 올바른 해석은?\n'Turning left, you will find the bank.'",
    "options": ["왼쪽으로 돌고 있는 너는", "왼쪽으로 돌자마자", "왼쪽으로 돈다면", "왼쪽으로 돌았기 때문에"],
    "correct_answer": "왼쪽으로 돈다면",
    "tags": ["syn_participle_clause", "syn_logic"],
    "explanation": "문맥상 조건(If you turn left)으로 해석하는 것이 가장 자연스럽습니다.",
    "wrong_feedback": {
      "왼쪽으로 돌고 있는 너는": "콤마(,)가 있으면 수식이 아니라 분사구문(부사절)으로 해석해야 해."
    }
  },
  {
    "id": 212,
    "category": "Syntax",
    "difficulty": 3,
    "question_text": "[구문 분석] 'It ~ to' 가주어 진주어 구문이 아닌 것은?",
    "options": ["It is fun to watch movies.", "It is important to study hard.", "It seems that he is rich.", "It is time to go to bed."],
    "correct_answer": "It seems that he is rich.",
    "tags": ["syn_it_to", "syn_structure"],
    "explanation": "It seems that... 은 가주어 it과 명사절(that절) 진주어 구문이거나 비인칭 주어 구문으로 분류됩니다. 나머지는 모두 It ~ to 부정사 구문입니다.",
    "wrong_feedback": {
      "It is fun to watch movies.": "가주어(It) - 진주어(to watch) 맞아."
    }
  },
  {
    "id": 213,
    "category": "Syntax",
    "difficulty": 3,
    "question_text": "[어순 배열] 간접의문문 어순이 바른 것은?",
    "options": ["I don't know where does he live.", "I don't know where he lives.", "I don't know where lives he.", "I don't know where is he living."],
    "correct_answer": "I don't know where he lives.",
    "tags": ["syn_indirect_question", "syn_word_order"],
    "explanation": "의문사 + 주어 + 동사(평서문 어순)가 되어야 합니다. where he lives.",
    "wrong_feedback": {
      "I don't know where does he live.": "does를 쓰면 안 되고 평서문처럼 동사에 s를 붙여야 해."
    }
  },
  {
    "id": 214,
    "category": "Syntax",
    "difficulty": 2,
    "question_text": "[동사 찾기] 다음 문장의 본동사는?\n'Thinking about the future makes me happy.'",
    "options": ["Thinking", "about", "makes", "happy"],
    "correct_answer": "makes",
    "tags": ["syn_main_verb", "syn_gerund_subject"],
    "explanation": "주어는 동명사구(Thinking about the future)이고, 본동사는 makes입니다. 동명사 주어는 단수 취급하여 s를 붙입니다.",
    "wrong_feedback": {
      "Thinking": "Thinking은 주어 역할을 하는 동명사야."
    }
  },
  {
    "id": 215,
    "category": "Syntax",
    "difficulty": 3,
    "question_text": "[관계사 해석] 콤마(,) 뒤의 관계대명사 해석법은?\n'I met Tom, who likes soccer.'",
    "options": ["축구를 좋아하는 톰을 만났다.", "나는 톰을 만났고, 그는 축구를 좋아한다.", "내가 만난 톰은 축구를 좋아한다.", "축구를 좋아하는 사람은 톰이다."],
    "correct_answer": "나는 톰을 만났고, 그는 축구를 좋아한다.",
    "tags": ["syn_relative_continuous", "syn_interpretation"],
    "explanation": "계속적 용법(콤마+who)은 '그런데 그는(and he)'으로 풀어서 순차적으로 해석합니다.",
    "wrong_feedback": {
      "축구를 좋아하는 톰을 만났다.": "그건 한정적 용법(콤마 없음)의 해석이야."
    }
  }
];
