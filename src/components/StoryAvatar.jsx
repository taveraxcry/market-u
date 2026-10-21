import { useApp } from '../context/AppContext.jsx';
import { useI18n } from '../i18n/LanguageContext.jsx';
import Avatar from './Avatar.jsx';

/** Avatar with an Instagram-style ring when the person has a story. Clicking it opens the story. */
export default function StoryAvatar({ personId, person, size = 44 }) {
  const { stories, hasStory, isGroupSeen, openStories } = useApp();
  const { t } = useI18n();
  if (!hasStory(personId)) return <Avatar person={person} size={size} />;
  const group = stories.find((s) => s.personId === personId);
  const seen = isGroupSeen(group);
  return (
    <button
      type="button"
      className={`story-ring story-ring--sm ${seen ? 'is-seen' : ''}`}
      onClick={() => openStories(personId)}
      aria-label={t('stories.viewerLabel', { name: person.name })}
    >
      <Avatar person={person} size={size - 6} />
    </button>
  );
}
