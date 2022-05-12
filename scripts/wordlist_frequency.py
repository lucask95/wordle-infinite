from asyncore import write
from typing import Set
from wordfreq import zipf_frequency, word_frequency

FILTER_NAMES = False
FREQUENCY_THRESHOLD = 2.4

def write_wordsandfreq_to_json(filename, words_with_freq):
  with open(filename, 'w+') as file:
    file.write('{\n    "items": [\n')
    for item in words_with_freq:
      s = '"word": "{0}", "frequency": {1}'.format(item['word'], item['frequency'])
      file.write('        { %s },\n' % s)
    file.write('    ]\n}')

def word_to_entry(word):
  return {
    'word': word,
    'frequency': zipf_frequency(word, 'en')
  }

def lines_to_list(filename):
  with open(filename) as file:
    lines = []
    for line in file:
      lines.append(line.lower().strip())
    return lines

if __name__ == "__main__":
  word_list = lines_to_list('../data/wordlist.txt')
  name_list = lines_to_list('../data/nameslist.txt')
  words_with_freq = [word_to_entry(word) for word in word_list]
  words_with_freq = list(filter(lambda entry: entry['frequency'] >= FREQUENCY_THRESHOLD, words_with_freq))
  write_wordsandfreq_to_json('../data/words_with_frequencies.json', words_with_freq)