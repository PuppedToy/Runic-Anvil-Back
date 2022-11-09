const adjectives = [
  {
    word: 'abandoned',
    forgeRange: '1-3',
  },
  {
    word: 'crimsom',
  },
  {
    word: 'elven',
  },
  {
    word: 'dwarven',
  },
  {
    word: 'goblin',
  },
  {
    word: 'furious',
    forgeRange: '1-5',
  },
  {
    word: 'sinful',
    relatedWords: ['sinister'],
  },
  {
    word: 'battle',
    forgeRange: '1-5',
    type: 'prefix',
  },
  // --- From here we have to review ---
  {
    word: 'able',
  },
  {
    word: 'above',
  },
  {
    word: 'absent',
  },
  {
    word: 'absolute',
  },
  {
    word: 'abstract',
  },
  {
    word: 'abundant',
  },
  {
    word: 'academic',
  },
  {
    word: 'acceptable',
  },
  {
    word: 'accepted',
  },
  {
    word: 'accessible',
  },
  {
    word: 'accurate',
  },
  {
    word: 'accused',
  },
  {
    word: 'active',
  },
  {
    word: 'actual',
  },
  {
    word: 'acute',
  },
  {
    word: 'added',
  },
  {
    word: 'additional',
  },
  {
    word: 'adequate',
  },
  {
    word: 'adjacent',
  },
  {
    word: 'administrative',
  },
  {
    word: 'adorable',
  },
  {
    word: 'advanced',
  },
  {
    word: 'adverse',
  },
  {
    word: 'advisory',
  },
  {
    word: 'aesthetic',
  },
  {
    word: 'afraid',
  },
  {
    word: 'african',
  },
  {
    word: 'aggregate',
  },
  {
    word: 'aggressive',
  },
  {
    word: 'agreeable',
  },
  {
    word: 'agreed',
  },
  {
    word: 'agricultural',
  },
  {
    word: 'alert',
  },
  {
    word: 'alive',
  },
  {
    word: 'alleged',
  },
  {
    word: 'allied',
  },
  {
    word: 'alone',
  },
  {
    word: 'alright',
  },
  {
    word: 'alternative',
  },
  {
    word: 'amateur',
  },
  {
    word: 'amazing',
  },
  {
    word: 'ambitious',
  },
  {
    word: 'american',
  },
  {
    word: 'amused',
  },
  {
    word: 'ancient',
  },
  {
    word: 'angry',
  },
  {
    word: 'annoyed',
  },
  {
    word: 'annual',
  },
  {
    word: 'anonymous',
  },
  {
    word: 'anxious',
  },
  {
    word: 'appalling',
  },
  {
    word: 'apparent',
  },
  {
    word: 'applicable',
  },
  {
    word: 'appropriate',
  },
  {
    word: 'arbitrary',
  },
  {
    word: 'architectural',
  },
  {
    word: 'armed',
  },
  {
    word: 'arrogant',
  },
  {
    word: 'artificial',
  },
  {
    word: 'artistic',
  },
  {
    word: 'ashamed',
  },
  {
    word: 'asleep',
  },
  {
    word: 'assistant',
  },
  {
    word: 'associated',
  },
  {
    word: 'atomic',
  },
  {
    word: 'attractive',
  },
  {
    word: 'australian',
  },
  {
    word: 'automatic',
  },
  {
    word: 'autonomous',
  },
  {
    word: 'available',
  },
  {
    word: 'average',
  },
  {
    word: 'awake',
  },
  {
    word: 'aware',
  },
  {
    word: 'awful',
  },
  {
    word: 'awkward',
  },
  {
    word: 'back',
  },
  {
    word: 'bad',
  },
  {
    word: 'balanced',
  },
  {
    word: 'bare',
  },
  {
    word: 'basic',
  },
  {
    word: 'beautiful',
  },
  {
    word: 'beneficial',
  },
  {
    word: 'better',
  },
  {
    word: 'bewildered',
  },
  {
    word: 'big',
  },
  {
    word: 'binding',
  },
  {
    word: 'biological',
  },
  {
    word: 'bitter',
  },
  {
    word: 'bizarre',
  },
  {
    word: 'black',
  },
  {
    word: 'blank',
  },
  {
    word: 'blind',
  },
  {
    word: 'blonde',
  },
  {
    word: 'bloody',
  },
  {
    word: 'blue',
  },
  {
    word: 'blushing',
  },
  {
    word: 'boiling',
  },
  {
    word: 'bold',
  },
  {
    word: 'bored',
  },
  {
    word: 'boring',
  },
  {
    word: 'bottom',
  },
  {
    word: 'brainy',
  },
  {
    word: 'brave',
  },
  {
    word: 'breakable',
  },
  {
    word: 'breezy',
  },
  {
    word: 'brief',
  },
  {
    word: 'bright',
  },
  {
    word: 'brilliant',
  },
  {
    word: 'british',
  },
  {
    word: 'broad',
  },
  {
    word: 'broken',
  },
  {
    word: 'brown',
  },
  {
    word: 'bumpy',
  },
  {
    word: 'burning',
  },
  {
    word: 'busy',
  },
  {
    word: 'calm',
  },
  {
    word: 'canadian',
  },
  {
    word: 'capable',
  },
  {
    word: 'capitalist',
  },
  {
    word: 'careful',
  },
  {
    word: 'casual',
  },
  {
    word: 'catholic',
  },
  {
    word: 'causal',
  },
  {
    word: 'cautious',
  },
  {
    word: 'central',
  },
  {
    word: 'certain',
  },
  {
    word: 'changing',
  },
  {
    word: 'characteristic',
  },
  {
    word: 'charming',
  },
  {
    word: 'cheap',
  },
  {
    word: 'cheerful',
  },
  {
    word: 'chemical',
  },
  {
    word: 'chief',
  },
  {
    word: 'chilly',
  },
  {
    word: 'chinese',
  },
  {
    word: 'chosen',
  },
  {
    word: 'christian',
  },
  {
    word: 'chronic',
  },
  {
    word: 'chubby',
  },
  {
    word: 'circular',
  },
  {
    word: 'civic',
  },
  {
    word: 'civil',
  },
  {
    word: 'civilian',
  },
  {
    word: 'classic',
  },
  {
    word: 'classical',
  },
  {
    word: 'clean',
  },
  {
    word: 'clear',
  },
  {
    word: 'clever',
  },
  {
    word: 'clinical',
  },
  {
    word: 'close',
  },
  {
    word: 'closed',
  },
  {
    word: 'cloudy',
  },
  {
    word: 'clumsy',
  },
  {
    word: 'coastal',
  },
  {
    word: 'cognitive',
  },
  {
    word: 'coherent',
  },
  {
    word: 'cold',
  },
  {
    word: 'collective',
  },
  {
    word: 'colonial',
  },
  {
    word: 'colorful',
  },
  {
    word: 'colossal',
  },
  {
    word: 'coloured',
  },
  {
    word: 'colourful',
  },
  {
    word: 'combative',
  },
  {
    word: 'combined',
  },
  {
    word: 'comfortable',
  },
  {
    word: 'coming',
  },
  {
    word: 'commercial',
  },
  {
    word: 'common',
  },
  {
    word: 'communist',
  },
  {
    word: 'compact',
  },
  {
    word: 'comparable',
  },
  {
    word: 'comparative',
  },
  {
    word: 'compatible',
  },
  {
    word: 'competent',
  },
  {
    word: 'competitive',
  },
  {
    word: 'complete',
  },
  {
    word: 'complex',
  },
  {
    word: 'complicated',
  },
  {
    word: 'comprehensive',
  },
  {
    word: 'compulsory',
  },
  {
    word: 'conceptual',
  },
  {
    word: 'concerned',
  },
  {
    word: 'concrete',
  },
  {
    word: 'condemned',
  },
  {
    word: 'confident',
  },
  {
    word: 'confidential',
  },
  {
    word: 'confused',
  },
  {
    word: 'conscious',
  },
  {
    word: 'conservation',
  },
  {
    word: 'conservative',
  },
  {
    word: 'considerable',
  },
  {
    word: 'consistent',
  },
  {
    word: 'constant',
  },
  {
    word: 'constitutional',
  },
  {
    word: 'contemporary',
  },
  {
    word: 'content',
  },
  {
    word: 'continental',
  },
  {
    word: 'continued',
  },
  {
    word: 'continuing',
  },
  {
    word: 'continuous',
  },
  {
    word: 'controlled',
  },
  {
    word: 'controversial',
  },
  {
    word: 'convenient',
  },
  {
    word: 'conventional',
  },
  {
    word: 'convinced',
  },
  {
    word: 'convincing',
  },
  {
    word: 'cooing',
  },
  {
    word: 'cool',
  },
  {
    word: 'cooperative',
  },
  {
    word: 'corporate',
  },
  {
    word: 'correct',
  },
  {
    word: 'corresponding',
  },
  {
    word: 'costly',
  },
  {
    word: 'courageous',
  },
  {
    word: 'crazy',
  },
  {
    word: 'creative',
  },
  {
    word: 'creepy',
  },
  {
    word: 'criminal',
  },
  {
    word: 'critical',
  },
  {
    word: 'crooked',
  },
  {
    word: 'crowded',
  },
  {
    word: 'crucial',
  },
  {
    word: 'crude',
  },
  {
    word: 'cruel',
  },
  {
    word: 'cuddly',
  },
  {
    word: 'cultural',
  },
  {
    word: 'curious',
  },
  {
    word: 'curly',
  },
  {
    word: 'current',
  },
  {
    word: 'curved',
  },
  {
    word: 'cute',
  },
  {
    word: 'daily',
  },
  {
    word: 'damaged',
  },
  {
    word: 'damp',
  },
  {
    word: 'dangerous',
  },
  {
    word: 'dark',
  },
  {
    word: 'dead',
  },
  {
    word: 'deaf',
  },
  {
    word: 'deafening',
  },
  {
    word: 'dear',
  },
  {
    word: 'decent',
  },
  {
    word: 'decisive',
  },
  {
    word: 'deep',
  },
  {
    word: 'defeated',
  },
  {
    word: 'defensive',
  },
  {
    word: 'defiant',
  },
  {
    word: 'definite',
  },
  {
    word: 'deliberate',
  },
  {
    word: 'delicate',
  },
  {
    word: 'delicious',
  },
  {
    word: 'delighted',
  },
  {
    word: 'delightful',
  },
  {
    word: 'democratic',
  },
  {
    word: 'dependent',
  },
  {
    word: 'depressed',
  },
  {
    word: 'desirable',
  },
  {
    word: 'desperate',
  },
  {
    word: 'detailed',
  },
  {
    word: 'determined',
  },
  {
    word: 'developed',
  },
  {
    word: 'developing',
  },
  {
    word: 'devoted',
  },
  {
    word: 'different',
  },
  {
    word: 'difficult',
  },
  {
    word: 'digital',
  },
  {
    word: 'diplomatic',
  },
  {
    word: 'direct',
  },
  {
    word: 'dirty',
  },
  {
    word: 'disabled',
  },
  {
    word: 'disappointed',
  },
  {
    word: 'disastrous',
  },
  {
    word: 'disciplinary',
  },
  {
    word: 'disgusted',
  },
  {
    word: 'distant',
  },
  {
    word: 'distinct',
  },
  {
    word: 'distinctive',
  },
  {
    word: 'distinguished',
  },
  {
    word: 'disturbed',
  },
  {
    word: 'disturbing',
  },
  {
    word: 'diverse',
  },
  {
    word: 'divine',
  },
  {
    word: 'dizzy',
  },
  {
    word: 'domestic',
  },
  {
    word: 'dominant',
  },
  {
    word: 'double',
  },
  {
    word: 'doubtful',
  },
  {
    word: 'drab',
  },
  {
    word: 'dramatic',
  },
  {
    word: 'dreadful',
  },
  {
    word: 'driving',
  },
  {
    word: 'drunk',
  },
  {
    word: 'dry',
  },
  {
    word: 'dual',
  },
  {
    word: 'due',
  },
  {
    word: 'dull',
  },
  {
    word: 'dusty',
  },
  {
    word: 'dutch',
  },
  {
    word: 'dying',
  },
  {
    word: 'dynamic',
  },
  {
    word: 'eager',
  },
  {
    word: 'early',
  },
  {
    word: 'eastern',
  },
  {
    word: 'easy',
  },
  {
    word: 'economic',
  },
  {
    word: 'educational',
  },
  {
    word: 'eerie',
  },
  {
    word: 'effective',
  },
  {
    word: 'efficient',
  },
  {
    word: 'elaborate',
  },
  {
    word: 'elated',
  },
  {
    word: 'elderly',
  },
  {
    word: 'eldest',
  },
  {
    word: 'electoral',
  },
  {
    word: 'electric',
  },
  {
    word: 'electrical',
  },
  {
    word: 'electronic',
  },
  {
    word: 'elegant',
  },
  {
    word: 'eligible',
  },
  {
    word: 'embarrassed',
  },
  {
    word: 'embarrassing',
  },
  {
    word: 'emotional',
  },
  {
    word: 'empirical',
  },
  {
    word: 'empty',
  },
  {
    word: 'enchanting',
  },
  {
    word: 'encouraging',
  },
  {
    word: 'endless',
  },
  {
    word: 'energetic',
  },
  {
    word: 'english',
  },
  {
    word: 'enormous',
  },
  {
    word: 'enthusiastic',
  },
  {
    word: 'entire',
  },
  {
    word: 'entitled',
  },
  {
    word: 'envious',
  },
  {
    word: 'environmental',
  },
  {
    word: 'equal',
  },
  {
    word: 'equivalent',
  },
  {
    word: 'essential',
  },
  {
    word: 'established',
  },
  {
    word: 'estimated',
  },
  {
    word: 'ethical',
  },
  {
    word: 'ethnic',
  },
  {
    word: 'european',
  },
  {
    word: 'eventual',
  },
  {
    word: 'everyday',
  },
  {
    word: 'evident',
  },
  {
    word: 'evil',
  },
  {
    word: 'evolutionary',
  },
  {
    word: 'exact',
  },
  {
    word: 'excellent',
  },
  {
    word: 'exceptional',
  },
  {
    word: 'excess',
  },
  {
    word: 'excessive',
  },
  {
    word: 'excited',
  },
  {
    word: 'exciting',
  },
  {
    word: 'exclusive',
  },
  {
    word: 'existing',
  },
  {
    word: 'exotic',
  },
  {
    word: 'expected',
  },
  {
    word: 'expensive',
  },
  {
    word: 'experienced',
  },
  {
    word: 'experimental',
  },
  {
    word: 'explicit',
  },
  {
    word: 'extended',
  },
  {
    word: 'extensive',
  },
  {
    word: 'external',
  },
  {
    word: 'extra',
  },
  {
    word: 'extraordinary',
  },
  {
    word: 'extreme',
  },
  {
    word: 'exuberant',
  },
  {
    word: 'faint',
  },
  {
    word: 'fair',
  },
  {
    word: 'faithful',
  },
  {
    word: 'familiar',
  },
  {
    word: 'famous',
  },
  {
    word: 'fancy',
  },
  {
    word: 'fantastic',
  },
  {
    word: 'far',
  },
  {
    word: 'fascinating',
  },
  {
    word: 'fashionable',
  },
  {
    word: 'fast',
  },
  {
    word: 'fat',
  },
  {
    word: 'fatal',
  },
  {
    word: 'favourable',
  },
  {
    word: 'favourite',
  },
  {
    word: 'federal',
  },
  {
    word: 'fellow',
  },
  {
    word: 'female',
  },
  {
    word: 'feminist',
  },
  {
    word: 'few',
  },
  {
    word: 'fierce',
  },
  {
    word: 'filthy',
  },
  {
    word: 'final',
  },
  {
    word: 'financial',
  },
  {
    word: 'fine',
  },
  {
    word: 'firm',
  },
  {
    word: 'fiscal',
  },
  {
    word: 'fit',
  },
  {
    word: 'fixed',
  },
  {
    word: 'flaky',
  },
  {
    word: 'flat',
  },
  {
    word: 'flexible',
  },
  {
    word: 'fluffy',
  },
  {
    word: 'fluttering',
  },
  {
    word: 'flying',
  },
  {
    word: 'following',
  },
  {
    word: 'fond',
  },
  {
    word: 'foolish',
  },
  {
    word: 'foreign',
  },
  {
    word: 'formal',
  },
  {
    word: 'formidable',
  },
  {
    word: 'forthcoming',
  },
  {
    word: 'fortunate',
  },
  {
    word: 'forward',
  },
  {
    word: 'fragile',
  },
  {
    word: 'frail',
  },
  {
    word: 'frantic',
  },
  {
    word: 'free',
  },
  {
    word: 'french',
  },
  {
    word: 'frequent',
  },
  {
    word: 'fresh',
  },
  {
    word: 'friendly',
  },
  {
    word: 'frightened',
  },
  {
    word: 'front',
  },
  {
    word: 'frozen',
  },
  {
    word: 'fucking',
  },
  {
    word: 'full',
  },
  {
    word: 'full-time',
  },
  {
    word: 'fun',
  },
  {
    word: 'functional',
  },
  {
    word: 'fundamental',
  },
  {
    word: 'funny',
  },
  {
    word: 'furious',
  },
  {
    word: 'future',
  },
  {
    word: 'fuzzy',
  },
  {
    word: 'gastric',
  },
  {
    word: 'gay',
  },
  {
    word: 'general',
  },
  {
    word: 'generous',
  },
  {
    word: 'genetic',
  },
  {
    word: 'gentle',
  },
  {
    word: 'genuine',
  },
  {
    word: 'geographical',
  },
  {
    word: 'german',
  },
  {
    word: 'giant',
  },
  {
    word: 'gigantic',
  },
  {
    word: 'given',
  },
  {
    word: 'glad',
  },
  {
    word: 'glamorous',
  },
  {
    word: 'gleaming',
  },
  {
    word: 'global',
  },
  {
    word: 'glorious',
  },
  {
    word: 'golden',
  },
  {
    word: 'good',
  },
  {
    word: 'gorgeous',
  },
  {
    word: 'gothic',
  },
  {
    word: 'governing',
  },
  {
    word: 'graceful',
  },
  {
    word: 'gradual',
  },
  {
    word: 'grand',
  },
  {
    word: 'grateful',
  },
  {
    word: 'greasy',
  },
  {
    word: 'great',
  },
  {
    word: 'greek',
  },
  {
    word: 'green',
  },
  {
    word: 'grey',
  },
  {
    word: 'grieving',
  },
  {
    word: 'grim',
  },
  {
    word: 'gross',
  },
  {
    word: 'grotesque',
  },
  {
    word: 'growing',
  },
  {
    word: 'grubby',
  },
  {
    word: 'grumpy',
  },
  {
    word: 'guilty',
  },
  {
    word: 'handicapped',
  },
  {
    word: 'handsome',
  },
  {
    word: 'happy',
  },
  {
    word: 'hard',
  },
  {
    word: 'harsh',
  },
  {
    word: 'head',
  },
  {
    word: 'healthy',
  },
  {
    word: 'heavy',
  },
  {
    word: 'helpful',
  },
  {
    word: 'helpless',
  },
  {
    word: 'hidden',
  },
  {
    word: 'high',
  },
  {
    word: 'high-pitched',
  },
  {
    word: 'hilarious',
  },
  {
    word: 'hissing',
  },
  {
    word: 'historic',
  },
  {
    word: 'historical',
  },
  {
    word: 'hollow',
  },
  {
    word: 'holy',
  },
  {
    word: 'homeless',
  },
  {
    word: 'homely',
  },
  {
    word: 'hon',
  },
  {
    word: 'honest',
  },
  {
    word: 'horizontal',
  },
  {
    word: 'horrible',
  },
  {
    word: 'hostile',
  },
  {
    word: 'hot',
  },
  {
    word: 'huge',
  },
  {
    word: 'human',
  },
  {
    word: 'hungry',
  },
  {
    word: 'hurt',
  },
  {
    word: 'hushed',
  },
  {
    word: 'husky',
  },
  {
    word: 'icy',
  },
  {
    word: 'ideal',
  },
  {
    word: 'identical',
  },
  {
    word: 'ideological',
  },
  {
    word: 'ill',
  },
  {
    word: 'illegal',
  },
  {
    word: 'imaginative',
  },
  {
    word: 'immediate',
  },
  {
    word: 'immense',
  },
  {
    word: 'imperial',
  },
  {
    word: 'implicit',
  },
  {
    word: 'important',
  },
  {
    word: 'impossible',
  },
  {
    word: 'impressed',
  },
  {
    word: 'impressive',
  },
  {
    word: 'improved',
  },
  {
    word: 'inadequate',
  },
  {
    word: 'inappropriate',
  },
  {
    word: 'inc',
  },
  {
    word: 'inclined',
  },
  {
    word: 'increased',
  },
  {
    word: 'increasing',
  },
  {
    word: 'incredible',
  },
  {
    word: 'independent',
  },
  {
    word: 'indian',
  },
  {
    word: 'indirect',
  },
  {
    word: 'individual',
  },
  {
    word: 'industrial',
  },
  {
    word: 'inevitable',
  },
  {
    word: 'influential',
  },
  {
    word: 'informal',
  },
  {
    word: 'inherent',
  },
  {
    word: 'initial',
  },
  {
    word: 'injured',
  },
  {
    word: 'inland',
  },
  {
    word: 'inner',
  },
  {
    word: 'innocent',
  },
  {
    word: 'innovative',
  },
  {
    word: 'inquisitive',
  },
  {
    word: 'instant',
  },
  {
    word: 'institutional',
  },
  {
    word: 'insufficient',
  },
  {
    word: 'intact',
  },
  {
    word: 'integral',
  },
  {
    word: 'integrated',
  },
  {
    word: 'intellectual',
  },
  {
    word: 'intelligent',
  },
  {
    word: 'intense',
  },
  {
    word: 'intensive',
  },
  {
    word: 'interested',
  },
  {
    word: 'interesting',
  },
  {
    word: 'interim',
  },
  {
    word: 'interior',
  },
  {
    word: 'intermediate',
  },
  {
    word: 'internal',
  },
  {
    word: 'international',
  },
  {
    word: 'intimate',
  },
  {
    word: 'invisible',
  },
  {
    word: 'involved',
  },
  {
    word: 'iraqi',
  },
  {
    word: 'irish',
  },
  {
    word: 'irrelevant',
  },
  {
    word: 'islamic',
  },
  {
    word: 'isolated',
  },
  {
    word: 'israeli',
  },
  {
    word: 'italian',
  },
  {
    word: 'itchy',
  },
  {
    word: 'japanese',
  },
  {
    word: 'jealous',
  },
  {
    word: 'jewish',
  },
  {
    word: 'jittery',
  },
  {
    word: 'joint',
  },
  {
    word: 'jolly',
  },
  {
    word: 'joyous',
  },
  {
    word: 'judicial',
  },
  {
    word: 'juicy',
  },
  {
    word: 'junior',
  },
  {
    word: 'just',
  },
  {
    word: 'keen',
  },
  {
    word: 'key',
  },
  {
    word: 'kind',
  },
  {
    word: 'known',
  },
  {
    word: 'korean',
  },
  {
    word: 'labour',
  },
  {
    word: 'large',
  },
  {
    word: 'large-scale',
  },
  {
    word: 'late',
  },
  {
    word: 'latin',
  },
  {
    word: 'lazy',
  },
  {
    word: 'leading',
  },
  {
    word: 'left',
  },
  {
    word: 'legal',
  },
  {
    word: 'legislative',
  },
  {
    word: 'legitimate',
  },
  {
    word: 'lengthy',
  },
  {
    word: 'lesser',
  },
  {
    word: 'level',
  },
  {
    word: 'lexical',
  },
  {
    word: 'liable',
  },
  {
    word: 'liberal',
  },
  {
    word: 'light',
  },
  {
    word: 'like',
  },
  {
    word: 'likely',
  },
  {
    word: 'limited',
  },
  {
    word: 'linear',
  },
  {
    word: 'linguistic',
  },
  {
    word: 'liquid',
  },
  {
    word: 'literary',
  },
  {
    word: 'little',
  },
  {
    word: 'live',
  },
  {
    word: 'lively',
  },
  {
    word: 'living',
  },
  {
    word: 'local',
  },
  {
    word: 'logical',
  },
  {
    word: 'lonely',
  },
  {
    word: 'long',
  },
  {
    word: 'long-term',
  },
  {
    word: 'loose',
  },
  {
    word: 'lost',
  },
  {
    word: 'loud',
  },
  {
    word: 'lovely',
  },
  {
    word: 'low',
  },
  {
    word: 'loyal',
  },
  {
    word: 'ltd',
  },
  {
    word: 'lucky',
  },
  {
    word: 'mad',
  },
  {
    word: 'magenta',
  },
  {
    word: 'magic',
  },
  {
    word: 'magnetic',
  },
  {
    word: 'magnificent',
  },
  {
    word: 'main',
  },
  {
    word: 'major',
  },
  {
    word: 'male',
  },
  {
    word: 'mammoth',
  },
  {
    word: 'managerial',
  },
  {
    word: 'managing',
  },
  {
    word: 'manual',
  },
  {
    word: 'many',
  },
  {
    word: 'marginal',
  },
  {
    word: 'marine',
  },
  {
    word: 'marked',
  },
  {
    word: 'married',
  },
  {
    word: 'marvellous',
  },
  {
    word: 'marxist',
  },
  {
    word: 'mass',
  },
  {
    word: 'massive',
  },
  {
    word: 'mathematical',
  },
  {
    word: 'mature',
  },
  {
    word: 'maximum',
  },
  {
    word: 'mean',
  },
  {
    word: 'meaningful',
  },
  {
    word: 'mechanical',
  },
  {
    word: 'medical',
  },
  {
    word: 'medieval',
  },
  {
    word: 'melodic',
  },
  {
    word: 'melted',
  },
  {
    word: 'mental',
  },
  {
    word: 'mere',
  },
  {
    word: 'metropolitan',
  },
  {
    word: 'mid',
  },
  {
    word: 'middle',
  },
  {
    word: 'middle-class',
  },
  {
    word: 'mighty',
  },
  {
    word: 'mild',
  },
  {
    word: 'military',
  },
  {
    word: 'miniature',
  },
  {
    word: 'minimal',
  },
  {
    word: 'minimum',
  },
  {
    word: 'ministerial',
  },
  {
    word: 'minor',
  },
  {
    word: 'miserable',
  },
  {
    word: 'misleading',
  },
  {
    word: 'missing',
  },
  {
    word: 'misty',
  },
  {
    word: 'mixed',
  },
  {
    word: 'moaning',
  },
  {
    word: 'mobile',
  },
  {
    word: 'moderate',
  },
  {
    word: 'modern',
  },
  {
    word: 'modest',
  },
  {
    word: 'molecular',
  },
  {
    word: 'monetary',
  },
  {
    word: 'monthly',
  },
  {
    word: 'moral',
  },
  {
    word: 'motionless',
  },
  {
    word: 'muddy',
  },
  {
    word: 'multiple',
  },
  {
    word: 'mushy',
  },
  {
    word: 'musical',
  },
  {
    word: 'mute',
  },
  {
    word: 'mutual',
  },
  {
    word: 'mysterious',
  },
  {
    word: 'naked',
  },
  {
    word: 'narrow',
  },
  {
    word: 'nasty',
  },
  {
    word: 'national',
  },
  {
    word: 'native',
  },
  {
    word: 'natural',
  },
  {
    word: 'naughty',
  },
  {
    word: 'naval',
  },
  {
    word: 'near',
  },
  {
    word: 'nearby',
  },
  {
    word: 'neat',
  },
  {
    word: 'necessary',
  },
  {
    word: 'negative',
  },
  {
    word: 'neighbouring',
  },
  {
    word: 'nervous',
  },
  {
    word: 'net',
  },
  {
    word: 'neutral',
  },
  {
    word: 'new',
  },
  {
    word: 'nice',
  },
  {
    word: 'nineteenth-century',
  },
  {
    word: 'noble',
  },
  {
    word: 'noisy',
  },
  {
    word: 'normal',
  },
  {
    word: 'northern',
  },
  {
    word: 'nosy',
  },
  {
    word: 'notable',
  },
  {
    word: 'novel',
  },
  {
    word: 'nuclear',
  },
  {
    word: 'numerous',
  },
  {
    word: 'nursing',
  },
  {
    word: 'nutritious',
  },
  {
    word: 'nutty',
  },
  {
    word: 'obedient',
  },
  {
    word: 'objective',
  },
  {
    word: 'obliged',
  },
  {
    word: 'obnoxious',
  },
  {
    word: 'obvious',
  },
  {
    word: 'occasional',
  },
  {
    word: 'occupational',
  },
  {
    word: 'odd',
  },
  {
    word: 'official',
  },
  {
    word: 'ok',
  },
  {
    word: 'okay',
  },
  {
    word: 'old',
  },
  {
    word: 'old-fashioned',
  },
  {
    word: 'olympic',
  },
  {
    word: 'only',
  },
  {
    word: 'open',
  },
  {
    word: 'operational',
  },
  {
    word: 'opposite',
  },
  {
    word: 'optimistic',
  },
  {
    word: 'oral',
  },
  {
    word: 'orange',
  },
  {
    word: 'ordinary',
  },
  {
    word: 'organic',
  },
  {
    word: 'organisational',
  },
  {
    word: 'original',
  },
  {
    word: 'orthodox',
  },
  {
    word: 'other',
  },
  {
    word: 'outdoor',
  },
  {
    word: 'outer',
  },
  {
    word: 'outrageous',
  },
  {
    word: 'outside',
  },
  {
    word: 'outstanding',
  },
  {
    word: 'overall',
  },
  {
    word: 'overseas',
  },
  {
    word: 'overwhelming',
  },
  {
    word: 'painful',
  },
  {
    word: 'pale',
  },
  {
    word: 'palestinian',
  },
  {
    word: 'panicky',
  },
  {
    word: 'parallel',
  },
  {
    word: 'parental',
  },
  {
    word: 'parliamentary',
  },
  {
    word: 'part-time',
  },
  {
    word: 'partial',
  },
  {
    word: 'particular',
  },
  {
    word: 'passing',
  },
  {
    word: 'passive',
  },
  {
    word: 'past',
  },
  {
    word: 'patient',
  },
  {
    word: 'payable',
  },
  {
    word: 'peaceful',
  },
  {
    word: 'peculiar',
  },
  {
    word: 'perfect',
  },
  {
    word: 'permanent',
  },
  {
    word: 'persistent',
  },
  {
    word: 'personal',
  },
  {
    word: 'petite',
  },
  {
    word: 'philosophical',
  },
  {
    word: 'physical',
  },
  {
    word: 'pink',
  },
  {
    word: 'plain',
  },
  {
    word: 'planned',
  },
  {
    word: 'plastic',
  },
  {
    word: 'pleasant',
  },
  {
    word: 'pleased',
  },
  {
    word: 'poised',
  },
  {
    word: 'polish',
  },
  {
    word: 'polite',
  },
  {
    word: 'political',
  },
  {
    word: 'poor',
  },
  {
    word: 'popular',
  },
  {
    word: 'positive',
  },
  {
    word: 'possible',
  },
  {
    word: 'post-war',
  },
  {
    word: 'potential',
  },
  {
    word: 'powerful',
  },
  {
    word: 'practical',
  },
  {
    word: 'precious',
  },
  {
    word: 'precise',
  },
  {
    word: 'preferred',
  },
  {
    word: 'pregnant',
  },
  {
    word: 'preliminary',
  },
  {
    word: 'premier',
  },
  {
    word: 'prepared',
  },
  {
    word: 'present',
  },
  {
    word: 'presidential',
  },
  {
    word: 'pretty',
  },
  {
    word: 'previous',
  },
  {
    word: 'prickly',
  },
  {
    word: 'primary',
  },
  {
    word: 'prime',
  },
  {
    word: 'primitive',
  },
  {
    word: 'principal',
  },
  {
    word: 'printed',
  },
  {
    word: 'prior',
  },
  {
    word: 'private',
  },
  {
    word: 'probable',
  },
  {
    word: 'productive',
  },
  {
    word: 'professional',
  },
  {
    word: 'profitable',
  },
  {
    word: 'profound',
  },
  {
    word: 'progressive',
  },
  {
    word: 'prominent',
  },
  {
    word: 'promising',
  },
  {
    word: 'proper',
  },
  {
    word: 'proposed',
  },
  {
    word: 'prospective',
  },
  {
    word: 'protective',
  },
  {
    word: 'protestant',
  },
  {
    word: 'proud',
  },
  {
    word: 'provincial',
  },
  {
    word: 'psychiatric',
  },
  {
    word: 'psychological',
  },
  {
    word: 'public',
  },
  {
    word: 'puny',
  },
  {
    word: 'pure',
  },
  {
    word: 'purple',
  },
  {
    word: 'purring',
  },
  {
    word: 'puzzled',
  },
  {
    word: 'quaint',
  },
  {
    word: 'qualified',
  },
  {
    word: 'quick',
  },
  {
    word: 'quickest',
  },
  {
    word: 'quiet',
  },
  {
    word: 'racial',
  },
  {
    word: 'radical',
  },
  {
    word: 'rainy',
  },
  {
    word: 'random',
  },
  {
    word: 'rapid',
  },
  {
    word: 'rare',
  },
  {
    word: 'raspy',
  },
  {
    word: 'rational',
  },
  {
    word: 'ratty',
  },
  {
    word: 'raw',
  },
  {
    word: 'ready',
  },
  {
    word: 'real',
  },
  {
    word: 'realistic',
  },
  {
    word: 'rear',
  },
  {
    word: 'reasonable',
  },
  {
    word: 'recent',
  },
  {
    word: 'red',
  },
  {
    word: 'reduced',
  },
  {
    word: 'redundant',
  },
  {
    word: 'regional',
  },
  {
    word: 'registered',
  },
  {
    word: 'regular',
  },
  {
    word: 'regulatory',
  },
  {
    word: 'related',
  },
  {
    word: 'relative',
  },
  {
    word: 'relaxed',
  },
  {
    word: 'relevant',
  },
  {
    word: 'reliable',
  },
  {
    word: 'relieved',
  },
  {
    word: 'religious',
  },
  {
    word: 'reluctant',
  },
  {
    word: 'remaining',
  },
  {
    word: 'remarkable',
  },
  {
    word: 'remote',
  },
  {
    word: 'renewed',
  },
  {
    word: 'representative',
  },
  {
    word: 'repulsive',
  },
  {
    word: 'required',
  },
  {
    word: 'resident',
  },
  {
    word: 'residential',
  },
  {
    word: 'resonant',
  },
  {
    word: 'respectable',
  },
  {
    word: 'respective',
  },
  {
    word: 'responsible',
  },
  {
    word: 'resulting',
  },
  {
    word: 'retail',
  },
  {
    word: 'retired',
  },
  {
    word: 'revolutionary',
  },
  {
    word: 'rich',
  },
  {
    word: 'ridiculous',
  },
  {
    word: 'right',
  },
  {
    word: 'rigid',
  },
  {
    word: 'ripe',
  },
  {
    word: 'rising',
  },
  {
    word: 'rival',
  },
  {
    word: 'roasted',
  },
  {
    word: 'robust',
  },
  {
    word: 'rolling',
  },
  {
    word: 'roman',
  },
  {
    word: 'romantic',
  },
  {
    word: 'rotten',
  },
  {
    word: 'rough',
  },
  {
    word: 'round',
  },
  {
    word: 'royal',
  },
  {
    word: 'rubber',
  },
  {
    word: 'rude',
  },
  {
    word: 'ruling',
  },
  {
    word: 'running',
  },
  {
    word: 'rural',
  },
  {
    word: 'russian',
  },
  {
    word: 'sacred',
  },
  {
    word: 'sad',
  },
  {
    word: 'safe',
  },
  {
    word: 'salty',
  },
  {
    word: 'satisfactory',
  },
  {
    word: 'satisfied',
  },
  {
    word: 'scared',
  },
  {
    word: 'scary',
  },
  {
    word: 'scattered',
  },
  {
    word: 'scientific',
  },
  {
    word: 'scornful',
  },
  {
    word: 'scottish',
  },
  {
    word: 'scrawny',
  },
  {
    word: 'screeching',
  },
  {
    word: 'secondary',
  },
  {
    word: 'secret',
  },
  {
    word: 'secure',
  },
  {
    word: 'select',
  },
  {
    word: 'selected',
  },
  {
    word: 'selective',
  },
  {
    word: 'selfish',
  },
  {
    word: 'semantic',
  },
  {
    word: 'senior',
  },
  {
    word: 'sensible',
  },
  {
    word: 'sensitive',
  },
  {
    word: 'separate',
  },
  {
    word: 'serious',
  },
  {
    word: 'severe',
  },
  {
    word: 'sexual',
  },
  {
    word: 'shaggy',
  },
  {
    word: 'shaky',
  },
  {
    word: 'shallow',
  },
  {
    word: 'shared',
  },
  {
    word: 'sharp',
  },
  {
    word: 'sheer',
  },
  {
    word: 'shiny',
  },
  {
    word: 'shivering',
  },
  {
    word: 'shocked',
  },
  {
    word: 'short',
  },
  {
    word: 'short-term',
  },
  {
    word: 'shrill',
  },
  {
    word: 'shy',
  },
  {
    word: 'sick',
  },
  {
    word: 'significant',
  },
  {
    word: 'silent',
  },
  {
    word: 'silky',
  },
  {
    word: 'silly',
  },
  {
    word: 'similar',
  },
  {
    word: 'simple',
  },
  {
    word: 'single',
  },
  {
    word: 'skilled',
  },
  {
    word: 'skinny',
  },
  {
    word: 'sleepy',
  },
  {
    word: 'slight',
  },
  {
    word: 'slim',
  },
  {
    word: 'slimy',
  },
  {
    word: 'slippery',
  },
  {
    word: 'slow',
  },
  {
    word: 'small',
  },
  {
    word: 'smart',
  },
  {
    word: 'smiling',
  },
  {
    word: 'smoggy',
  },
  {
    word: 'smooth',
  },
  {
    word: 'so-called',
  },
  {
    word: 'social',
  },
  {
    word: 'socialist',
  },
  {
    word: 'soft',
  },
  {
    word: 'solar',
  },
  {
    word: 'sole',
  },
  {
    word: 'solid',
  },
  {
    word: 'sophisticated',
  },
  {
    word: 'sore',
  },
  {
    word: 'sorry',
  },
  {
    word: 'sound',
  },
  {
    word: 'sour',
  },
  {
    word: 'southern',
  },
  {
    word: 'spare',
  },
  {
    word: 'sparkling',
  },
  {
    word: 'spatial',
  },
  {
    word: 'special',
  },
  {
    word: 'specific',
  },
  {
    word: 'specified',
  },
  {
    word: 'spectacular',
  },
  {
    word: 'spicy',
  },
  {
    word: 'spiritual',
  },
  {
    word: 'splendid',
  },
  {
    word: 'spontaneous',
  },
  {
    word: 'sporting',
  },
  {
    word: 'spotless',
  },
  {
    word: 'spotty',
  },
  {
    word: 'square',
  },
  {
    word: 'squealing',
  },
  {
    word: 'stable',
  },
  {
    word: 'stale',
  },
  {
    word: 'standard',
  },
  {
    word: 'static',
  },
  {
    word: 'statistical',
  },
  {
    word: 'statutory',
  },
  {
    word: 'steady',
  },
  {
    word: 'steep',
  },
  {
    word: 'sticky',
  },
  {
    word: 'stiff',
  },
  {
    word: 'still',
  },
  {
    word: 'stingy',
  },
  {
    word: 'stormy',
  },
  {
    word: 'straight',
  },
  {
    word: 'straightforward',
  },
  {
    word: 'strange',
  },
  {
    word: 'strategic',
  },
  {
    word: 'strict',
  },
  {
    word: 'striking',
  },
  {
    word: 'striped',
  },
  {
    word: 'strong',
  },
  {
    word: 'structural',
  },
  {
    word: 'stuck',
  },
  {
    word: 'stupid',
  },
  {
    word: 'subjective',
  },
  {
    word: 'subsequent',
  },
  {
    word: 'substantial',
  },
  {
    word: 'subtle',
  },
  {
    word: 'successful',
  },
  {
    word: 'successive',
  },
  {
    word: 'sudden',
  },
  {
    word: 'sufficient',
  },
  {
    word: 'suitable',
  },
  {
    word: 'sunny',
  },
  {
    word: 'super',
  },
  {
    word: 'superb',
  },
  {
    word: 'superior',
  },
  {
    word: 'supporting',
  },
  {
    word: 'supposed',
  },
  {
    word: 'supreme',
  },
  {
    word: 'sure',
  },
  {
    word: 'surprised',
  },
  {
    word: 'surprising',
  },
  {
    word: 'surrounding',
  },
  {
    word: 'surviving',
  },
  {
    word: 'suspicious',
  },
  {
    word: 'sweet',
  },
  {
    word: 'swift',
  },
  {
    word: 'swiss',
  },
  {
    word: 'symbolic',
  },
  {
    word: 'sympathetic',
  },
  {
    word: 'systematic',
  },
  {
    word: 'tall',
  },
  {
    word: 'tame',
  },
  {
    word: 'tan',
  },
  {
    word: 'tart',
  },
  {
    word: 'tasteless',
  },
  {
    word: 'tasty',
  },
  {
    word: 'technical',
  },
  {
    word: 'technological',
  },
  {
    word: 'teenage',
  },
  {
    word: 'temporary',
  },
  {
    word: 'tender',
  },
  {
    word: 'tense',
  },
  {
    word: 'terrible',
  },
  {
    word: 'territorial',
  },
  {
    word: 'testy',
  },
  {
    word: 'then',
  },
  {
    word: 'theoretical',
  },
  {
    word: 'thick',
  },
  {
    word: 'thin',
  },
  {
    word: 'thirsty',
  },
  {
    word: 'thorough',
  },
  {
    word: 'thoughtful',
  },
  {
    word: 'thoughtless',
  },
  {
    word: 'thundering',
  },
  {
    word: 'tight',
  },
  {
    word: 'tiny',
  },
  {
    word: 'tired',
  },
  {
    word: 'top',
  },
  {
    word: 'tory',
  },
  {
    word: 'total',
  },
  {
    word: 'tough',
  },
  {
    word: 'toxic',
  },
  {
    word: 'traditional',
  },
  {
    word: 'tragic',
  },
  {
    word: 'tremendous',
  },
  {
    word: 'tricky',
  },
  {
    word: 'tropical',
  },
  {
    word: 'troubled',
  },
  {
    word: 'turkish',
  },
  {
    word: 'typical',
  },
  {
    word: 'ugliest',
  },
  {
    word: 'ugly',
  },
  {
    word: 'ultimate',
  },
  {
    word: 'unable',
  },
  {
    word: 'unacceptable',
  },
  {
    word: 'unaware',
  },
  {
    word: 'uncertain',
  },
  {
    word: 'unchanged',
  },
  {
    word: 'uncomfortable',
  },
  {
    word: 'unconscious',
  },
  {
    word: 'underground',
  },
  {
    word: 'underlying',
  },
  {
    word: 'unemployed',
  },
  {
    word: 'uneven',
  },
  {
    word: 'unexpected',
  },
  {
    word: 'unfair',
  },
  {
    word: 'unfortunate',
  },
  {
    word: 'unhappy',
  },
  {
    word: 'uniform',
  },
  {
    word: 'uninterested',
  },
  {
    word: 'unique',
  },
  {
    word: 'united',
  },
  {
    word: 'universal',
  },
  {
    word: 'unknown',
  },
  {
    word: 'unlikely',
  },
  {
    word: 'unnecessary',
  },
  {
    word: 'unpleasant',
  },
  {
    word: 'unsightly',
  },
  {
    word: 'unusual',
  },
  {
    word: 'unwilling',
  },
  {
    word: 'upper',
  },
  {
    word: 'upset',
  },
  {
    word: 'uptight',
  },
  {
    word: 'urban',
  },
  {
    word: 'urgent',
  },
  {
    word: 'used',
  },
  {
    word: 'useful',
  },
  {
    word: 'useless',
  },
  {
    word: 'usual',
  },
  {
    word: 'vague',
  },
  {
    word: 'valid',
  },
  {
    word: 'valuable',
  },
  {
    word: 'variable',
  },
  {
    word: 'varied',
  },
  {
    word: 'various',
  },
  {
    word: 'varying',
  },
  {
    word: 'vast',
  },
  {
    word: 'verbal',
  },
  {
    word: 'vertical',
  },
  {
    word: 'very',
  },
  {
    word: 'victorian',
  },
  {
    word: 'victorious',
  },
  {
    word: 'video-taped',
  },
  {
    word: 'violent',
  },
  {
    word: 'visible',
  },
  {
    word: 'visiting',
  },
  {
    word: 'visual',
  },
  {
    word: 'vital',
  },
  {
    word: 'vivacious',
  },
  {
    word: 'vivid',
  },
  {
    word: 'vocational',
  },
  {
    word: 'voiceless',
  },
  {
    word: 'voluntary',
  },
  {
    word: 'vulnerable',
  },
  {
    word: 'wandering',
  },
  {
    word: 'warm',
  },
  {
    word: 'wasteful',
  },
  {
    word: 'watery',
  },
  {
    word: 'weak',
  },
  {
    word: 'wealthy',
  },
  {
    word: 'weary',
  },
  {
    word: 'wee',
  },
  {
    word: 'weekly',
  },
  {
    word: 'weird',
  },
  {
    word: 'welcome',
  },
  {
    word: 'well',
  },
  {
    word: 'well-known',
  },
  {
    word: 'welsh',
  },
  {
    word: 'western',
  },
  {
    word: 'wet',
  },
  {
    word: 'whispering',
  },
  {
    word: 'white',
  },
  {
    word: 'whole',
  },
  {
    word: 'wicked',
  },
  {
    word: 'wide',
  },
  {
    word: 'wide-eyed',
  },
  {
    word: 'widespread',
  },
  {
    word: 'wild',
  },
  {
    word: 'willing',
  },
  {
    word: 'wise',
  },
  {
    word: 'witty',
  },
  {
    word: 'wonderful',
  },
  {
    word: 'wooden',
  },
  {
    word: 'working',
  },
  {
    word: 'working-class',
  },
  {
    word: 'worldwide',
  },
  {
    word: 'worried',
  },
  {
    word: 'worrying',
  },
  {
    word: 'worthwhile',
  },
  {
    word: 'worthy',
  },
  {
    word: 'written',
  },
  {
    word: 'wrong',
  },
  {
    word: 'yellow',
  },
  {
    word: 'young',
  },
  {
    word: 'yummy',
  },
  {
    word: 'zany',
  },
  {
    word: 'zealous',
  },
];

module.exports = adjectives;
