export const categorizationPrompt = (qst, answer) => "Tu es un outils de catégorisation de messages en milieu" +
    " hospitalier. Dans le cadre de tes fonctions tu recevra un " +
    "contexte médical du patient avec une question posé qu'on a " +
    "prefixé par '-QP-' et un la réponse du patient préfixé par " +
    "'-RD-'. Ton rôle est de catégoriser les messages en prenant" +
    " en compte la réponse du patient ainsi que la question posée " +
    "-QP- dans l'une de ces quatres catégories: 'TVB' si le patient" +
    " va bien, 'ATTENTION REQUISE' lorsque le patient présente des " +
    "troubles phyisque ou psychique léger, 'URGENCE' lorsque le patient" +
    " présente des troubles phyisque ou psychique grave ou lorsqu'il" +
    " sagit d'une situation grave ou que le message présente un caractère" +
    " d'urgence ou que le patient donne une annulation ou un retard à un" +
    " rendez-vous, 'N/A' lorsque le message ne répond pas à la -QP- ou " +
    "n'appartient à aucune autre catégorie. Si la réponse du patient est" +
    " courte et répond à la question posée, renvoies une chaine vide. Tu " +
    "ne dois pas donner d'explications. Dans ta réponse précise le taux de" +
    " certitude en pourcentage. Ta réponse doit-être au format json avec les clefs suivantes: category, confidence." +
    "-QP- correspond à la question posé et -RD- à la réponse que tu dois classifier." +
    `-QP-: \`${qst}\` ` +
    `-RD-: \`${answer}\``;


export const promptToDetermineRatingQuestion = (qst, id) => {
    return `
    Tu es une IA avancée en traitement de texte.
    Je vais te fournir une question.
    Tu analysera la QST.
    Si QST est possède un "?" 
    et que c'est une phrase qui parle de satisfaction
    et qu'l est demandé de choisir de choisir un chiffre dans un intervalle, 
    alors tu me retournes ceci : 
   { 
        "id": ${id},
        "isRating": true
   }.  
    
    Si QST ne possède possède pas de "?" 
    ou que ce n'est pas une phrase qui parle de satisfaction
    ou qu'il n'est pas demandé de choisir de choisir un chiffre dans un intervalle, 
    alors tu me retournes ceci : 
    {  
        "id": ${id},
        "isRating": false
   }. 
         
    QST : ${qst}
    `
}

export const promptToDetermineRate = (qst, answer) => {
    return `
    Tu es une IA avancée en traitement de texte.
    Je vais te fournir une question (QST) et une réponse (ANSWER).
    Tu analysera la QST et la ANSWER.
    Tu dois transformer ANSWER pour qu'il réponde à 100% à la QST.
    La QST est dans la majeur partie du temps avec un intervalle de note avec une MAX_NOTE et MIN_NOTE.
    
    Exemple : "Donner une note de 0 à 10" avec MAX_NOTE = 10 et MIN_NOTE = 0 .
    
    Tu retourneras une note cohérente avec la question qui sera IA_NOTE.
    
    Exemple : Notre QST est "Donner une note de 0 à 10" et notre ANSWER est "J'ai adoré, c'était super, géniale".
    MAX_NOTE = 10 et MIN_NOTE = 0
    Dans ce cas, tu dois retourner IA_NOTE = "10".
    
    Autre exemple : Notre QST est "Donner une note de 0 à 10" et notre ANSWER est "J'ai bien aimé la nourriture, mais l'accueil était nul".
    MAX_NOTE = 10 et MIN_NOTE = 0
    Dans ce cas, tu dois retourner IA_NOTE = "5".
    
    Autre exemple : Notre QST est "Donner une note de 0 à 10" et notre ANSWER est "Je n'ai pas aimé, c'était nul".
    MAX_NOTE = 10 et MIN_NOTE = 0
    Dans ce cas, tu dois retourner IA_NOTE = "0".
    
    S'il donne une note, tu dois retourner la note.
    Si ANSWER sous forme de texte avec aucun chiffre, tu dois la transformer en chiffre, le plus cohérent possible.
    Si la note/chiffre/nombre dans ANSWER est supérieur à la MAX_NOTE, mettre la MAX_NOTE.
    Si la note/chiffre/nombre dans ANSWER est inférieur MIN_NOTE, mettre la MIN_NOTE.
    
    Exemple: Notre QST est "Donner une note de 1 à 5 (1: pas du tout satisfait et 5: très satisfait" et notre ANSWER est "8, très satisfait".
    MAX_NOTE = 5 et MIN_NOTE = 1
    Dans ce cas, tu dois retourner IA_NOTE = "5".
    
    Exemple: Notre QST est "Donner une note de 1 à 5 (1: pas du tout satisfait et 5: très satisfait" et notre ANSWER est "-2, pas du tout satisfait".
    MAX_NOTE = 5 et MIN_NOTE = 1
    Dans ce cas, tu dois retourner IA_NOTE = "1".
    
    Tu dois retourner ta réponse sous forme la forme suivante, tu es obligé de retourner ceci : 
    {   
        "iaNote" : IA_NOTE,
         "maxNote" : MAX_NOTE si undefined, tu peux le mettre à 10 par défaut.
    }
    
    QST : ${qst}
    ANSWER : ${answer}
    `
}

export const simplificationPrompt = (qst, answer) => {
    return '' +
        "Tu es un outil de catégorisation de messages en milieu hospitalier. " +
        "Dans le cadre de tes fonctions tu recevra un contexte médical du patient " +
        "avec une question posé qu'on a prefixé par '-QP-' et la réponse du patient " +
        "préfixé par '-RD-'. Ton rôle est de modifier la réponse du patient en " +
        "proposant la réponse la plus courte possible. Ta modification doit répondre " +
        "uniquement à la question posé. Tu dois aussi donner le taux de précision de " +
        "ta réponse en pourcentage. Tu ne dois pas donner d'explication. Tu ne dois " +
        "pas faire de commentaire. Tu dois répondre avec un objet JSON contenant les " +
        "clef: resume et precision." +
        `-QP-: \`${qst}\` ` +
        `-RD-: \`${answer}\``;
}
